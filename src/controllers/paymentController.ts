import {Request, Response, NextFunction} from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import ErrorResponse from '../utils/errorResponse.util'
import { initializePayment } from '../services/paymentServices'

export const handleInitializePayment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {email, amount} = req.body
    if (!email || !amount) return next(new ErrorResponse('Email and amount are required', 400))
    const paystackResponse = await initializePayment(email, amount)
    res.status(200).json({message: 'Payment initialization successful', data: paystackResponse, error: false})
})
