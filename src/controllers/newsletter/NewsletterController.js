const NewsletterModel = require("./../../models/Newsletter")

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

        const emailUser = await NewsletterModel.findOne({email})

        if (emailUser){
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