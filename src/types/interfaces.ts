import { Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string
    email: string
    password: string
    resetPasswordToken?: string | undefined
    resetPasswordTokenExpires?: Date | undefined
    role: string
    isActive?: boolean
    isVerified: boolean
}

export interface IMailOptions {
    email: string
    subject: string
    message: string
}

export interface IProduct extends Document {
    name: string
    description: string
    price: number
    category: string
    stock: number
    images: string[]
    isFeatured: boolean
}

export interface ICart extends Document {
    userId: Types.ObjectId;
    items:
        {
            productId: Types.ObjectId
            quantity: number
        }[];

    totalPrice: number;
}

export interface IOrder extends Document {
    userId: Types.ObjectId;
    items:
        {
            productId: Types.ObjectId
            quantity: number
            price: number
        }[];
    shippingAddress: {
        street: string
        city: string
        state: string
        zipcode: string
        country: string
    };
    paymentStatus: string;
    orderStatus: string;
    totalPrice: number;
}

export interface IPayment extends Document {
    userId: Types.ObjectId
    orderId: Types.ObjectId
    paymentMethod: string
    paymentStatus: string
    transactionId: string
    amount: number
}

export interface ICategory extends Document {
    name: string
    description: string
}

export interface IAuthRequest extends Request {
    headers: {
        authorization?: string
    } & Request['headers']
    userId?: string
}