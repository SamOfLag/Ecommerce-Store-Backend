import axios from 'axios'
import Cart from "../models/Cart.model"
import Order from "../models/Order.model"
import { IPaystackVerificationResponse } from "../types_/interfaces"
import { PaymentStatus } from "../utils/enums.util"
import ErrorResponse from "../utils/errorResponse.util"


// const paystackPaymentVerificationUrl = 'https://api.paystack.co/transaction/verify'

export const createOrder = async (
    userId: string, 
    shippingAddress: {
        street: string
        city: string
        state: string
        zipcode: string
        country: string
    },
    paymentReference: string
) => {
    const paymentResponse = await axios.get<IPaystackVerificationResponse>(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
    })

    if (paymentResponse.data.status !== true) throw new ErrorResponse('Payment verification failed', 400)

    const cart = await Cart.findOne({userId}).populate('items.productId')
    if (!cart || cart.items.length === 0) throw new ErrorResponse('Cart is empty', 400) 

    const totalPrice = cart.items.reduce((total, item) => {
        const product = item.productId as any
        return total + item.quantity * product.price
    }, 0)

    const newOrder = new Order({
        userId,
        items: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: (item.productId as any).price
        })),
        shippingAddress,
        paymentStatus: PaymentStatus.Success,
        totalPrice,
    })

    await Cart.findOneAndDelete({userId})

    return newOrder.save()
}

export const getUserOrders = async (userId: string) => {
    return Order.findOne({userId})
}

export const getOrderStatus = async (userId: string) => {
    const orders = await Order.findOne({ userId }).select("orderStatus totalPrice items createdAt");
    return orders;
};