import {Schema} from "mongoose";

export const createSchema = (fields: Record<string, any>, options = {}) => {
    return new Schema(fields, {timestamps: true, ...options})
}