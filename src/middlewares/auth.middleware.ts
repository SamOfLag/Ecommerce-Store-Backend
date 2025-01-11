import { Request, Response, NextFunction } from "express"
import ErrorResponse from "../utils/errorResponse.util"
import jwt from "jsonwebtoken"
import { IAuthRequest } from "../types/interfaces"


const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new ErrorResponse('Unauthorized access', 401)

    try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string}
    req.userId = decodedToken.userId
    next()
    } catch (error) {
        next (new ErrorResponse('Invalid login credentials', 403))
    }
}

export default authMiddleware;