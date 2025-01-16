import mongoose from "mongoose"
import dotenv from 'dotenv'
import Product from "../models/Product.model"
import color from 'colors'

dotenv.config()

const products = [
    {
        name: "Laptop",
        description: "High-performance laptop",
        price: 1200,
        category: "Electronics",
        stock: 20,
        images: ["https://example.com/laptop.jpg"],
        isFeatured: true,
    },
    {
        name: "T-shirt",
        description: "Comfortable cotton T-shirt",
        price: 25,
        category: "Clothing",
        stock: 50,
        images: ["https://example.com/tshirt.jpg"],
        isFeatured: false,
    },
]

export const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)

        await Product.deleteMany({})
        console.log(color.yellow.bold.underline('Product collection cleared'))

        await Product.insertMany(products)
        console.log(color.magenta.bold.underline('Product data seeded successfully'))

        await mongoose.disconnect()
        console.log(color.cyan.bold.underline('Disconnected from MongoDB'))

    } catch (error) {
        console.error(color.red.bold.underline('Error seeding products:'), error)
        process.exit(1)
    }
}

if (require.main === module) {
    seedProducts()
}