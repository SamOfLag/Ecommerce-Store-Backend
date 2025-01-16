import { Router } from "express";
import { handdleAdminLogin, handleEmailVerification, handleForgotPassword, handleResetPassowrd, handleSignin, handleSignup } from "../controllers/authController";

const authRouter = Router()

authRouter.post('/signup', handleSignup)
authRouter.post('/signin', handleSignin)
authRouter.post('/verify-email/:token', handleEmailVerification)
authRouter.post('/forgot-password', handleForgotPassword)
authRouter.post('/reset-password/:token', handleResetPassowrd)
authRouter.post('/admin/signin', handdleAdminLogin)

export default authRouter;