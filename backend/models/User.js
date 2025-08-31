const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // The role can only be one of these values
        default: 'user'
    }
}, { timestamps: true }); // timestamps adds createdAt and updatedAt fields automatically

const User = mongoose.model('User', userSchema);
module.exports = User;