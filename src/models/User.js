const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    token: {
        type: String,
        default: null
    }
}, {timestamps: true})

const UserModel = mongoose.model("User", schema)

module.exports = UserModel;