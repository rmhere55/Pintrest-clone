const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")

const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/printrestkaapp")
// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        // required: true,
        // unique: true,
        trim: true
    },
    password: {
        type: String,
        // required: true
    },
    posts: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
    },
    dp: {
        type: String, // URL to the display picture
        default: ''
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        trim: true
    },
    fullname: {
        type: String,
        // required: true,
        // trim: true
    }

    // timestamps: true // Adds createdAt and updatedAt timestamps
});
userSchema.plugin(plm)

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
