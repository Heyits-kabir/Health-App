const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Load environment variables
dotenv.config();
// Connect to the database
connectDB();

const app = express();

app.use(express.json());

// A simple test route to see if the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));