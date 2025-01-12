import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getProducts, searchProducts } from "../services/productServices";


export const fetchProducts = asyncHandler(async (req: Request, res: Response) => {
    const {category} = req.query
    const products = await getProducts(category as string)
    res.status(200).json({message: 'Products fetched successfully', data: products, error: false})
})

export const searchForProducts = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({message: "Search query is required", data: null, error: true});
    const products = await searchProducts(query as string);
    res.status(200).json({ message: 'Product search successful', data: products, error: false });
  });