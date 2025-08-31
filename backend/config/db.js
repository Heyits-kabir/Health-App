const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use the same variable name here
        const conn = await mongoose.connect(process.env.MONGODB_URL); 
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;