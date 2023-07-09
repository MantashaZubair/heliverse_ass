const mongoose = require("mongoose")

const connectDB = async() => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URL) 
       console.log(`connected to mongodb  Database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error mongodb  Database ${error}`) 
    }
}

module.exports= connectDB