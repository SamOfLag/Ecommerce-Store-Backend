import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { IAddToCartBody, IAuthRequest } from "../types_/interfaces";
import { addToCart, removeCartItem, updateCartItem } from "../services/cartServices";
import ErrorResponse from "../utils/errorResponse.util";


export const handleAddToCart = asyncHandler(async (req: IAuthRequest & {body: IAddToCartBody}, res: Response) => {
    const {productId, quantity} = req.body
    const userId = req.userId;
    if (!userId) throw new ErrorResponse("User ID is required", 400);

    const cart = await addToCart(userId, productId, quantity)
    res.status(200).json({message: 'Cart created successfully', data: cart, error: false})
})


export const handleUpdateCart = asyncHandler(async (req: IAuthRequest & {body: IAddToCartBody; params: {id: string}}, res: Response) => {
    const {id: cartItemId} = req.params
    const {quantity} = req.body
    const userId = req.userId
    const cart = await updateCartItem(userId, cartItemId, quantity)
    res.status(200).json({message: 'Cart updated successfully', data: cart, error: false})
})

export const handleRemoveCartItem = asyncHandler(async (req: IAuthRequest & {params: {id: string}}, res: Response) => {
    const {id: cartItemId} = req.params
    const userId = req.userId
    const cart = await removeCartItem(userId, cartItemId)
    res.status(200).json({message: 'Cart removed successfully', data: cart, error: false})
})