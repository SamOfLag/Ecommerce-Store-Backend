import Redis from "ioredis";
import dotenv from 'dotenv'
import color from 'colors'

dotenv.config()

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number (process.env.REDIS_PORT),
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    // tls: {}
})


redisClient.on('connect', () => console.log(color.blue.bold.underline('Redis Connected Successfully')))
redisClient.on('error', (error) => console.error('Redis error:', error))

export default redisClient;