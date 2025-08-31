const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    // This creates the relationship to the User model
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This tells Mongoose to look for the ID in the 'User' collection
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [String] // An array of strings
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;