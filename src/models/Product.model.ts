import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types_/interfaces";


const ProductSchema: Schema<IProduct> = new Schema(
    {
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    category: {type: String, required: true, trim: true},
    stock: {type: Number, required: true, trim: true},
    images: {type: [String], required: true},
    isFeatured: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model<IProduct>('Product', ProductSchema)
export default Product;