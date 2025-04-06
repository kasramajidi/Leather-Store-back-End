const CriticismsModel = require("./../../models/Criticisms")


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

        const firstNameRegex = /^[a-z]{3,15}$/
        if (!firstNameRegex.test(firstName)) {
            return res.status(401).json({
                message: "firstName and lastName must be at least 3 or 15 chars long"
            })
        }

        const lastNameRegex = /^[a-z]{3,15}$/
        if (!lastNameRegex.test(lastName)) {
            return res.status(401).json({
                message: "firstName and lastName must be at least 3 or 15 chars long"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if (!emailRegex.test(email)) {
            return res.status(402).json({
                message: "The email is invalid"
            })
        }

        const numberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

        if (!numberRegex.test(number)) {
            return res.status(403).json({
                message: "The phone is invalid"
            })
        }

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(404).json({
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
    try{
        const getAll = await CriticismsModel.find({}).lean()
        res.status(200).json(getAll)
    }catch (err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}