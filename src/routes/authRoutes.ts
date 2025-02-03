import { Router } from "express";
import { handleEmailVerification, handleForgotPassword, handleResetPassowrd, handleSignin, handleSignup } from "../controllers/authController";

const authRouter = Router()

authRouter.post('/signup', handleSignup)
authRouter.post('/signin', handleSignin)
authRouter.post('/verify-email', handleEmailVerification)
authRouter.post('/forgot-password', handleForgotPassword)
authRouter.post('/reset-password', handleResetPassowrd)

export default authRouter;