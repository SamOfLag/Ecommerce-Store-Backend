import mongoose, {Schema, model} from "mongoose";
import { IUser } from "../types_/interfaces";
import { UserRole } from "../utils/enums.util";


const UserSchema: Schema<IUser> = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, minlength: 6},
        resetPasswordToken: {type: String, required: false},
        resetPasswordTokenExpires: {type: Date, required: false},
        role: {type: String, enum: Object.values(UserRole), default: UserRole.Shopper},
        isActive: {type: String, default: true},
        isVerified: {type: Boolean, default: false}
     },
     {
        timestamps: true
     }
)


const User = mongoose.model<IUser>('User', UserSchema)
export default User;