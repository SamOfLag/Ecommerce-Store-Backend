import { NextFunction, Request, Response } from "express";
import { signup, signin, verifyEmail, forgotPassword, resetPassword, adminSignin } from "../services/authServices";
import { asyncHandler } from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse.util";


/**
 * @name handleSignup
 * @description Handles user signup by creating a new user in the database
 * @param {Request} req - The Express request object containing the user's name, email, and password in the body.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promised<void>} - Sends a JSON response with the status of the signup process.
 */

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
    const user = await signup(firstName, lastName, email, password);

    res.status(201).json({ message: "User created successfully", data: null, error: false });
    return
});


/**
 * @name handleSignin
 * @description Handles user signin by validating credentials and returning a JWT.
 * @param {Request} req - The Express request object containing the user's email and password in the body.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promise<void>} - Sends a JSON response with the JWT token on successful login.
 */

export const handleSignin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await signin(email, password);
    res.status(200).json({ message: "Login successful", data: token, error: false });
});


/**
 * @name handleEmailVerification
 * @description Verifies a user's email using a token from the request parameters.
 * @param {Request} req - The Express request object containing the verification token in the parameters.
 * @param {Response} res - The Express response object used to send the response.
 * @param {NextFunction} next - The Express `next` function to handle errors.
 * @returns {Promise<void>} - Sends a JSON response confirming the email verification status.
 */

export const handleEmailVerification = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.params
    const email = await verifyEmail(token)
    res.status(200).json({message: 'Email verified successfully', data: email, error: false})
})


/**
 * @name handleForgotPassword
 * @description Handles password reset requests by sending a password reset email to the user.
 * @param {Request} req - The Express request object containing the user's email in the body.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promise<void>} - Sends a JSON response confirming the password reset request.
 */

export const handleForgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await forgotPassword(email);
    res.status(200).json({ message: result, data: null, error: false });
});


export const handleResetPassowrd = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {password} = req.body
    const {token} = req.params

    if(!password) throw new ErrorResponse('Password is required', 400)
    if(!token) throw new ErrorResponse('Token is required', 400)

    const result = await resetPassword(password, token)
    res.status(200).json({message: result, data: null, error: false})
})

export const handdleAdminLogin = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body
    const token = await adminSignin(email, password)
    res.status(200).json({message: 'Login successful', data: token, error: false})
})