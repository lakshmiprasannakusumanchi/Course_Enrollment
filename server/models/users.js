// Schema of the collection name "User"-the info of the registered users to the application is stored 
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the user name"],
        },
        email: {
            type: String,
            required: [true, "Please add the user email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'admin',  
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", userSchema);
