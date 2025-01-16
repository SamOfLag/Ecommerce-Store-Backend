import { seedProducts } from "./seedProducts"
import color from 'colors'


const seedAll = async () => {
    try {
        await seedProducts()
        console.log(color.green.bold.underline('All data seeded successfully'))
        process.exit(0)

    } catch (error) {
        console.log(color.red.bold.underline('Error seeding data:'), error)
        process.exit(1)
    }
}

if (require.main === module) {
    seedAll()
}