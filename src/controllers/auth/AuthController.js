const UserModel = require("./../../models/User")
const bcryptjs = require("bcryptjs")
const { truncateSync } = require("fs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please enter username, email and password"
            })
        }

        const usernameRegex = /^[a-z0-9_-]{3,15}$/

        if (!usernameRegex.test(username)) {
            return res.status(401).json({
                message: "Username must be at least 3 or 15 chars long"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

        if (!emailRegex.test(email)) {
            return res.status(402).json({
                message: "The email is invalid"
            })
        }

        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/

        if (!passwordRegex.test(password)) {
            return res.status(403).json({
                message: "The password is invalid"
            })
        }

        const emailUser = await UserModel.findOne({ email })

        if (emailUser) {
            return res.status(405).json({ message: "Email is already registered." });
        }

        const hashPassword = await bcryptjs.hash(password, 10)

        const newUser = await UserModel.create({
            username,
            email,
            password: hashPassword,
        })

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )

        newUser.token = token;
        await newUser.save()

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.MODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "User registered successfully!",
            newUser,
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            })
        }

        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

        if (!emailRegex.test(email)) {
            return res.status(401).json({
                message: "The email is invalid"
            })
        }

        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/

        if (!passwordRegex.test(password)) {
            return res.status(402).json({
                message: "The password is invalid"
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(403).json({ message: "Invalid email or password." });
        }

        const comparePassword = await bcryptjs.compare(password, user.password)

        if (!comparePassword) {
            return res.status(403).json({ message: "Invalid email or password." });
        }

        const newToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )

        await UserModel.findByIdAndUpdate(user._id, { token: newToken })

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.MODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                usename: user.username,
                email: user.email,
                role: user.role
            },
            token: newToken
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}