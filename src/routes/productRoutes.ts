import { Router } from "express";
import { handleAddProduct, handleDeleteProduct, handleEditProduct, handleGetProducts, handleSearchProducts } from "../controllers/productController";
import { requireRole } from "../middlewares/roleMiddleware";
import authMiddleware from "../middlewares/auth.middleware";

const productRouter = Router()

// PRODUCT ROUTERS FOR SHOPPERS
productRouter.get('/get', handleGetProducts)
productRouter.get('/search', handleSearchProducts)

// PRODUCT ROUTERS FOR ADMINS
productRouter.post('/add', requireRole('admin'), handleAddProduct)
productRouter.put('/:id', requireRole('admin'), handleEditProduct)
productRouter.delete('/:id', requireRole('admin'), handleDeleteProduct)

export default productRouter;