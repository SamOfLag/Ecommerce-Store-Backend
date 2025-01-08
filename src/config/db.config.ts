import mongoose from "mongoose";
import color from 'colors'

const connectDB = async () => {
    try {

        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined')
        }
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(color.green.bold.underline(`MongoDB Connected: ${connect.connection.host}`))

    } catch (error) {
        console.error('MongoDB connection failed', error)
        process.exit(1)
        
    }
}

export default connectDB