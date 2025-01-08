import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.config'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.middleware'

dotenv.config()
connectDB()

const app = express()

// express default middlewares
app.use(express.json())
app.use(cors())



// custome errorHandler
app.use(errorHandler)


// server listening
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})