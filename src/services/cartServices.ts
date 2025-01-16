import { Types } from "mongoose";
import Cart from "../models/Cart.model";
import Product from "../models/Product.model";
import { ICart } from "../types_/interfaces";
import ErrorResponse from "../utils/errorResponse.util";



export const addToCart = async (userId: string | undefined, productId: string, quantity: number): Promise<ICart> => {
   
    const productIdToObject = new Types.ObjectId(productId)
    const product = await Product.findById(productIdToObject)
    if (!product) throw new ErrorResponse('Product not found', 404)

    let cart = await Cart.findOne({userId})
    if (!cart) {
        cart = new Cart({userId, items: [], totalPrice: 0})
    }
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
    } else {
        cart.items.push({productId: productIdToObject, quantity})
    }
    
    cart.totalPrice = cart.items.reduce((total, item) => {
        const productPrice = item.productId.toString() === productId ? product.price : 0
        return total + productPrice * item.quantity
    }, 0)

    return cart.save()
}

export const updateCartItem = async (userId: string | undefined, cartItemId: string, quantity: number): Promise<ICart> => {
    const cart = await Cart.findOne({userId}).populate('items.productId')

    if (!cart) throw new ErrorResponse('Cart not found', 400)

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === cartItemId)
    if (itemIndex === -1) throw new ErrorResponse('Item not found', 400) 

    cart.items[itemIndex].quantity = quantity;
    cart.totalPrice = cart.items.reduce((total, item) => {
        const product = item.productId as any
        return total + item.quantity * product.price
    }, 0);

    return cart.save()
}

export const removeCartItem = async (userId: string | undefined, cartItemId: string): Promise<ICart> => {
    const cart = await Cart.findOne({userId}).populate('items.productId')
    if (!cart) throw new ErrorResponse('Cart not found', 400)

    cart.items = cart.items.filter((item) => item.productId.toString() !== cartItemId)
    cart.totalPrice = cart.items.reduce((total, item) => {
        const product = item.productId as any
        return total + item.quantity * product.price
    }, 0)

    return cart.save()
}