import { IProduct } from "../types_/interfaces";
import Product from "../models/Product.model";
import redisClient from "../config/redisClient";

/**
 * Fetch products from cache or database
 * @param {string} [category] - Optional category filter
 * @returns {Promise<IProduct[]>} - List of products
 */

export const getProducts = async (category?: string): Promise<IProduct[]> => {
    const cacheKey = category ? `products:${category}` : 'products:all'

    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) return JSON.parse(cachedData)

    const filter = category ? {category} : {}
    const products = await Product.find(filter)

    await redisClient.set(cacheKey, JSON.stringify(products), 'EX', 3600)
    return products
}


/**
 * Search for products by query
 * @param {string} query - Search term
 * @returns {Promise<IProduct[]>} - List of matching products
 */

export const searchProducts = async (query: string): Promise<IProduct[]> => {
    const regex = new RegExp(query, 'i')
    return Product.find({name: regex})
}