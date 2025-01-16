import { Router } from "express";
import { handleAddToCart, handleRemoveCartItem, handleUpdateCart } from "../controllers/cartController";
import authMiddleware from "../middlewares/auth.middleware";

const cartRouter = Router()

cartRouter.post('/', handleAddToCart)
cartRouter.put('/:id', handleUpdateCart)
cartRouter.delete('/:id', handleRemoveCartItem)

export default cartRouter;