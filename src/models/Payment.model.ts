import mongoose, { mongo, Schema } from "mongoose";
import { IPayment } from "../types/interfaces";

const PaymentSchema: Schema<IPayment> = new Schema( 
    {
        userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        orderId: {type: Schema.Types.ObjectId, ref: 'Order', required: true},
        paymentMethod: {type: String, required: true},
        paymentStatus: {type: String, enum: ['Success', 'Pending', 'Failed'], default: 'Pending'},
        transactionId: {type: String, required: true, unique: true},
        amount: {type: Number, required: true, min: 0}
    },
    {
        timestamps: true
    }
)


const Payment = mongoose.model<IPayment>('Payment', PaymentSchema)
export default Payment;