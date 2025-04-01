const NewsletterModel = require("./../../models/Newsletter")
const mongoose = require("mongoose")

exports.getAll = async (req, res) => {
    try {
        const getData = await NewsletterModel.find({}).lean()
        res.status(200).json(getData)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.create = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Please enter email"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

        if (!emailRegex.test(email)) {
            return res.status(401).json({
                message: "The email is invalid"
            })
        }

        const emailUser = await NewsletterModel.findOne({ email })

        if (emailUser) {
            return res.status(402).json({ message: "Email is already registered." });
        }

        const newsletter = await NewsletterModel.create({
            email
        })

        res.status(200).json({
            message: "You have successfully subscribed to the newsletter",
            newsletter
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not Valid"
            })
        }

        const remove = await NewsletterModel.findOneAndDelete({ _id: id })

        if (!remove) {
            return res.status(401).json({
                message: "Newsletter not found"
            })
        }

        res.status(200).json({
            message: "This Newsletter has been successfully deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const { email } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not Valid"
            })
        }

        if (!email) {
            return res.status(401).json({
                message: "Please enter email"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

        if (!emailRegex.test(email)) {
            return res.status(402).json({
                message: "The email is invalid"
            })
        }

        const update = await NewsletterModel.findByIdAndUpdate({ _id: id }, {
            email,
        })

        res.status(200).json({
            message: `This Newslettee has been successfully update`,
            update
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}