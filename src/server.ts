import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.config'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.middleware'
import authRouter from './routes/authRoutes'
import color from 'colors'
import productRouter from './routes/productRoutes'

dotenv.config()
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
connectDB()

const app = express()

// express default middlewares
app.use(express.json())
app.use(cors())

// mounted routes
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)


// custom errorHandler
app.use(errorHandler)


// server listening
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(color.yellow.bold.underline(`Server listening on port ${PORT}`))
})