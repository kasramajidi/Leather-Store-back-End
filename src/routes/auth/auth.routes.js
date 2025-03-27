const express = require("express")
const AuthController = require("./../../controllers/auth/AuthController")
const AuthRouter = express.Router()

AuthRouter
    .route("/register")
    .post(AuthController.register)

AuthRouter
    .route("/login")
    .post(AuthController.login)

module.exports = AuthRouter;