    const mongoose = require("mongoose")

    const schema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxLength: 10000
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max:5
        }
    }, { timestamps: true })

    const CriticismsModel = mongoose.model("Criticisms", schema)

    module.exports = CriticismsModel;