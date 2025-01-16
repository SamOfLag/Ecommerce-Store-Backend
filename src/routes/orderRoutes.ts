import { Router } from "express";
import { handleCreateOrder, handleGetOrders, handleGetOrderStatus, handleUpdateOrderStatus } from "../controllers/orderController";
import { requireRole } from "../middlewares/roleMiddleware";

const orderRouter = Router()

// ORDER ROUTERS FOR SHOPPERS
orderRouter.post('/create', handleCreateOrder)
orderRouter.get('/user', handleGetOrders)
orderRouter.get('/status', handleGetOrderStatus)

// ORDER ROUTERS FOR ADMIN
orderRouter.get('/get', requireRole('admin'), handleGetOrders)
orderRouter.put('/:id', requireRole('admin'), handleUpdateOrderStatus)

export default orderRouter;