import { Router } from "express";
import { fetchProducts, searchForProducts } from "../controllers/productController";

const productRouter = Router()

productRouter.get('/', fetchProducts)
productRouter.get('/search', searchForProducts)

export default productRouter;