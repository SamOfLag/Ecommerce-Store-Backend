import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getProducts, searchProducts } from "../services/productServices";
import Product from "../models/Product.model";

// SHOPPERS' PRODUCT CONTROLLER
export const handleGetProducts = asyncHandler(async (req: Request, res: Response) => {
    const {category} = req.query
    const products = await getProducts(category as string)
    res.status(200).json({message: 'Products fetched successfully', data: products, error: false})
})

export const handleSearchProducts = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({message: "Search query is required", data: null, error: true});
    const products = await searchProducts(query as string);
    res.status(200).json({ message: 'Product search successful', data: products, error: false });
  });


// ADMIN PRODUCT MANAGEMENT CONTROLLER

export const handleAddProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = new Product(req.body)
    await product.save()
    res.status(200).json({message: 'Product added successfully', data: product, error: false})
})

export const handleEditProduct = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
    if (!product) return res.status(404).json({message: 'Product not found', data: null, error: true})
        res.status(200).json({message: 'Product updated successfully', data: product, error: false})
})

export const handleDeleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) return res.status(404).json({message: 'Product not found', data: null, error: true})
    res.status(200).json({message: 'Product deleted successfully', data: product, error: false})
})