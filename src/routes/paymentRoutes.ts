import { Router } from "express";
import { handleInitializePayment } from "../controllers/paymentController";

const paymentRouter = Router()

paymentRouter.post('/initialize', handleInitializePayment)

export default paymentRouter;