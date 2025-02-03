import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.config'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.middleware'
import authRouter from './routes/authRoutes'
import color from 'colors'
import productRouter from './routes/productsRoutes'
import cartRouter from './routes/cartRoutes'
import authMiddleware from './middlewares/auth.middleware'
import paymentRouter from './routes/paymentRoutes'
import orderRouter from './routes/orderRoutes'
import adminRouter from './routes/adminRoutes'

dotenv.config()
connectDB()

const app = express()

// express default middlewares
app.use(express.json())
app.use(cors())

// mounted routes
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', authMiddleware, cartRouter)
app.use('/api/payment', authMiddleware, paymentRouter)
app.use('/api/orders', authMiddleware, orderRouter)
app.use('/api/admin/users', authMiddleware, adminRouter)


// custom errorHandler
app.use(errorHandler)


// server listening
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(color.yellow.bold.underline(`Server listening on port ${PORT}`))
})