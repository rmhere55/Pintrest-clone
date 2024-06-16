const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
    postText: {
        type: String,
        // required: true,
        trim: true
    },
    
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // required: true
    },
    likes: {
        type: Array,
        default: []
    }
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
