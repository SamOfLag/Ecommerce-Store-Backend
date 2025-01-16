import bcrypt from 'bcrypt'
import User from '../models/User.model'
import { IUser } from '../types_/interfaces'
import ErrorResponse from '../utils/errorResponse.util'
import jwt, {JwtPayload} from 'jsonwebtoken'
import sendEmail from '../utils/sendEmail'
import crypto, { createHash } from 'crypto'


export const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<IUser> => {
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({firstName, lastName, email, password: hashPassword})
    const savedUser = await newUser.save()
    
    if (!savedUser) throw new ErrorResponse('Unable to register user', 500)

    const token = jwt.sign({ email: savedUser.email, role: savedUser.role }, process.env.JWT_SECRET!, { expiresIn: process.env.VERIFICATION_EMAIL_JWT_EXPIRES_IN });
    
    const message = `Click on the link below to verify your email: \n https://localhost:3000/verify?token=${token}`
    try {
        await sendEmail({
            email: savedUser.email,
            subject: 'Welcome onboard',
            message
        })
    } catch (emailError) {
        console.error('Failed to send email:', emailError)
    }
    
    return savedUser
}

export const signin = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({email})
    if(!user) throw new ErrorResponse('User not found', 500)
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) throw new ErrorResponse('Invalid password', 500)

    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
};  

export const verifyEmail = (token: string) => {
    if(!token) throw new ErrorResponse('Please provide token', 400)
        if(!process.env.JWT_SECRET) throw new ErrorResponse('Please provide secret', 400)
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = (decoded as JwtPayload).email
        const user = User.findOneAndUpdate({email}, {isVerified: true}, {new: true})
        if(!user) throw new ErrorResponse('User not found', 400)

        return user;
}

export const forgotPassword = async (email: string) => {
    const userEmail = await User.findOne({email})
    if(!userEmail) throw new ErrorResponse('email not found', 500)

    const user = await User.findOne({email})

    if(!user) throw new ErrorResponse('User not found', 404)

    const token = crypto.randomBytes(20).toString('hex')
    const hashedToken = createHash('sha256').update(token).digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordTokenExpires = new Date(Date.now() + (10 * 60 * 1000))

    await user.save()

    const resetUrl = `https://localhost:3000/reset?token=${token}`
    const message = `You are requesting this email because you (or someone else) requested to reset your password 
                    on Heizz. If this was you, click on the link below to reset your password: \n ${resetUrl} \n
                    If you didn't initiate this request, please ignore this email.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Reset Password',
            message
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpires = undefined
        await user.save()
        return new ErrorResponse('Error sending mail', 500)
    }

    return 'Password reset email sent!'
}

export const resetPassword = async (password: string, token: string) => {
    const hashToken = createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({resetPasswordToken: hashToken, resetPasswordTokenExpires: {$gt: Date.now()}})
    if(!user) throw new ErrorResponse('User not found', 400)

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpires = undefined
    await user.save()

    return 'Password successfully reset'
}

// ADMIN LOGIN

export const adminSignin = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({email});
    if (!user) throw new ErrorResponse('User not found', 500)

    if (user.role !== 'admin') throw new ErrorResponse('Access denied. Admin only', 400)

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new ErrorResponse('Invalid login credentials', 400)

    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRES_IN})
}