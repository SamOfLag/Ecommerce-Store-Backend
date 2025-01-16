import { Request, Response } from "express";
import { createOrder, getOrderStatus, getUserOrders } from "../services/orderServices";
import { IAuthRequest, ICreateOrderBody } from "../types_/interfaces";
import { asyncHandler } from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse.util";
import Order from "../models/Order.model";



export const handleCreateOrder = asyncHandler(async (req: IAuthRequest & {body: ICreateOrderBody}, res: Response) => {
    const {shippingAddress, paymentReference} = req.body
    const userId = req.userId
    if (!userId) throw new ErrorResponse("User ID is required", 400);

    if (
        !shippingAddress ||
        typeof shippingAddress !== "object" ||
        !shippingAddress.street ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.zipcode ||
        !shippingAddress.country
    ) throw new ErrorResponse('Invalid shipping address', 400)

    const order = await createOrder(userId, shippingAddress, paymentReference)
    res.status(200).json({message: 'Order created successully', data: order, error: false})
})

export const handleGetOrders = asyncHandler(async (req: IAuthRequest, res: Response) => {
    const userId = req.userId
    if (!userId) throw new ErrorResponse("User ID is required", 400);

    const orders = req.userRole === 'admin' 
    if (orders) {
    const allOrders = await Order.find().populate('userId', 'firstName email')
    res.status(200).json({message: 'All orders generated successfully', data: allOrders, error: false})
    }

    const userOrders = await getUserOrders(userId)
    res.status(200).json({message: 'User orders generated successfully', data: userOrders, error: false})

})

export const handleGetOrderStatus = asyncHandler(async (req: IAuthRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) return res.status(400).json({ message: "User ID is required", error: true });

    const orders = await getOrderStatus(userId);
    res.status(200).json({message: "Order status retrieved successfully", data: orders, error: false});
});

export const handleUpdateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const {status} = req.body

    const order = await Order.findByIdAndUpdate(id, {orderStatus: status}, {new: true})
    console.log('ORDER:', order)
    
    if (!order) {
    return res.status(404).json({message: 'Order not found', data: null, error: true})
    }

    res.status(200).json({message: `Order status updated to ${status} successfully`, data: order, error: false})
})