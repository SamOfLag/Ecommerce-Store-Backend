import mongoose, {Schema, model} from "mongoose";
import { IUser } from "../types/interfaces";


const UserSchema: Schema<IUser> = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, minlength: 6},
        resetPasswordToken: {type: String, required: false},
        resetPasswordTokenExpires: {type: Date, required: false},
        role: {type: String, default: 'shopper'},
        isActive: {type: String, default: true},
        isVerified: {type: Boolean, default: false}
     },
     {
        timestamps: true
     }
)


const User = mongoose.model<IUser>('User', UserSchema)
export default User;