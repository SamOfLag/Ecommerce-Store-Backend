import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/interfaces";

const CategorySchema: Schema<ICategory> = new Schema( 
    {
        name: {type: String, required: true, unique: true, trim: true},
        description: {type: String, default: null, trim: true}
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model<ICategory>('Category', CategorySchema)
export default Category;