import { Request, Response, NextFunction, RequestHandler } from "express"
import ErrorResponse from "../utils/errorResponse.util"
import jwt from "jsonwebtoken"
import { IAuthRequest } from "../types_/interfaces"


const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new ErrorResponse('Unauthorized access', 401)

    try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string, role: string}
    console.log('Decoded Token:', decodedToken)
    req.userId = decodedToken.id
    req.userRole = decodedToken.role

    next()

    } catch (error) {
        next (new ErrorResponse('Invalid login credentials', 403))
    }
}

export default authMiddleware as unknown as RequestHandler;