const CriticismsModel = require("./../../models/Criticisms")
const mongoose = require("mongoose")

exports.create = async (req, res) => {
    try {
        const { firstName, lastName, email, number, description, rating } = req.body
        const user = req.user

        if (!firstName) {
            return res.status(400).json({
                message: "Please enter firstName"
            })
        }

        if (!lastName) {
            return res.status(401).json({
                message: "Please enter lastName"
            })
        }

        if (!email) {
            return res.status(402).json({
                message: "Please enter email"
            })
        }

        if (!number) {
            return res.status(403).json({
                message: "Please enter number"
            })
        }

        if (!description) {
            return res.status(405).json({
                message: "Please enter description"
            })
        }

        if (!rating) {
            return res.status(406).json({
                message: "Please enter rating"
            })
        }

 
        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if (!emailRegex.test(email)) {
            return res.status(409).json({
                message: "The email is invalid"
            })
        }

        const numberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

        if (!numberRegex.test(number)) {
            return res.status(410).json({
                message: "The phone is invalid"
            })
        }

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(411).json({
                message: "Rating must be a number between 1 and 5"
            });
        }

        const create = await CriticismsModel.create({
            firstName,
            lastName,
            email,
            description,
            rating,
            number,
            user: user._id
        })

        res.status(200).json(create)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getAll = async (req, res) => {
    try {
        const getAll = await CriticismsModel.find({}).lean()
        res.status(200).json(getAll)
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
                message: 'ID is not valid'
            })
        }

        const remove = await CriticismsModel.findOneAndDelete({ _id: id })

        if (!remove) {
            return res.status(401).json({
                message: "There are no criticisms"
            })
        }

        res.status(200).json({
            message: "Criticisms successfully removed"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(412).json({
                message: "ID is not valid"
            })
        }

        const { firstName, lastName, email, number, description, rating } = req.body

        if (!firstName) {
            return res.status(400).json({
                message: "Please enter firstName"
            })
        }

        if (!lastName) {
            return res.status(401).json({
                message: "Please enter lastName"
            })
        }

        if (!email) {
            return res.status(402).json({
                message: "Please enter email"
            })
        }

        if (!number) {
            return res.status(403).json({
                message: "Please enter number"
            })
        }

        if (!description) {
            return res.status(405).json({
                message: "Please enter description"
            })
        }

        if (!rating) {
            return res.status(406).json({
                message: "Please enter rating"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if (!emailRegex.test(email)) {
            return res.status(409).json({
                message: "The email is invalid"
            })
        }

        const numberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

        if (!numberRegex.test(number)) {
            return res.status(410).json({
                message: "The phone is invalid"
            })
        }

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(411).json({
                message: "Rating must be a number between 1 and 5"
            });
        }

        const update = await CriticismsModel.findOneAndUpdate({ _id: id }, {
            firstName,
            lastName,
            description,
            number,
            rating,
            email
        })

        res.status(200).json({
            message: "Criticisms successfully update",
            update
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.confirm = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not valid"
            })
        }

        const update = await CriticismsModel.findByIdAndUpdate(
            id,
            { confirmed: true },
            { new: true }
        )

        if (!update) {
            return res.status(401).json({ message: "Criticism not found" });
        }

        res.status(200).json({
            message: "Criticism confirmed successfully",
            data: update
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.confirmedTrue = async (req, res) => {
    try {
        const { confirmed } = req.query

        let filter = {}

        if (confirmed === "true") {
            filter.confirmed = true
        } else if (confirmed === "false") {
            filter.confirmed = false
        }

        const findUp = await CriticismsModel.find(filter)

        res.status(200).json(findUp)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}