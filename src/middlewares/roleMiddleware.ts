import { Request, Response, NextFunction } from "express"


export const requireRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.userRole !== role) {
           res.status(403).json({message: `Access denied. Only ${role}s allowed.`})
            return;
        }
        next()
    }
}