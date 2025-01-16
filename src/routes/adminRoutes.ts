import { Router } from "express";
import { requireRole } from "../middlewares/roleMiddleware";
import { handleDeactivateUser, handleEditUser, handleGetUsers } from "../controllers/adminUserController";

const adminRouter = Router ()

adminRouter.get('/', requireRole('admin'), handleGetUsers)
adminRouter.put('/:id', requireRole('admin'), handleEditUser)
adminRouter.delete('/:id', requireRole('admin'), handleDeactivateUser)

export default adminRouter;