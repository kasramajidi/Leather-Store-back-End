const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

const NewsletterModel = mongoose.model("Newsletter", schema)

module.exports = NewsletterModel;