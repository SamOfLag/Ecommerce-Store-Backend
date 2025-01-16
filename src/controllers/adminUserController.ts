import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/User.model";


export const handleGetUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select('-password')
    res.status(200).json({message: 'Users fetched successfully', data: users, error: false})
})

export const handleEditUser = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const updates = req.body

    const user = await User.findByIdAndUpdate(id, updates, {new: true}).select('-password')
    if (!user) return res.status(404).json({message: 'User not found', data: null, error: true})

    res.status(200).json({message: 'User details edited successfully', data: user, error: false})
})

export const handleDeactivateUser = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params

    const user = await User.findByIdAndUpdate(id, {isActive: false}, {new: true}).select('-password')
    if (!user) return res.status(404).json({message: 'User not found', data: null, error: true})

    res.status(200).json({message: 'User account deactivated', data: user, error: false})
})