import mongoose, {Schema, model} from "mongoose";
import { IUser } from "../utils/interfaces.util";
import { createSchema } from "../utils/helper.util";

const userFields = {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, minlength: 6},
        role: {type: String, default: 'shopper'},
        isActive: {type: String, default: true}
}

const UserSchema = createSchema(userFields)

const User = mongoose.model<IUser>('User', UserSchema)
export default User;