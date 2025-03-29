const UserModel = require("./../../models/User")
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

exports.getAllUser = async (req, res) => {
    try {
        const user = await UserModel.find().lean()
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getByID = async (req, res) => {
    try {
        const id = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not vaild"
            })
        }

        const user = await UserModel.find({ _id: id }).lean()

        res.status(200).json(user)

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getByTitle = async (req, res) => {
    try {
        const { username } = req.params

        if (!username || username.length < 3) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        const getOneName = await UserModel.find({ username: { $regex: username, $options: "i" } })

        if (getOneName.length === 0) {
            return res.status(401).json({
                message: "No user found"
            })
        }

        res.status(200).json(getOneName)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.removeID = async (req, res) => {
    try {
        const id = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not vaild"
            })
        }

        const remove = await UserModel.findOneAndDelete({ _id: id })

        if (!remove) {
            return res.status(401).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "This User has been successfully deleted"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updaetID = async (req, res) => {
    try {

        const id = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not vaild"
            })
        }
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Please enter username, email and password"
            })
        }

        const userNameRegex = /^[a-z0-9_-]{3,15}$/

        if (!userNameRegex.test(username)) {
            return res.status(402).json({
                message: "Username must be at least 3 or 15 chars long"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

        if (!emailRegex.test(email)){
            return res.status(403).json({
                message: "The email is invalid"
            })
        }

        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/

        if (!passwordRegex.test(password)){
            return res.status(404).json({
                message: "The password is invalid"
            })
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        
        const update = await UserModel.findByIdAndUpdate({_id: id}, {
            username,
            email,
            password: hashPassword,
        })

        res.status(200).json({
            message: "This user has been successfully update",
            update
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}