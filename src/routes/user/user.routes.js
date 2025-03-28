const express = require("express")
const UserController = require("./../../controllers/user/UserController")
const UserRouter = express.Router()

UserRouter
    .route("/getAllUser")
    .get(UserController.getAllUser)

UserRouter
    .route("/getuserid/:id")
    .get(UserController.getByID)

UserRouter
    .route("/getusername/:username")
    .get(UserController.getByTitle)

module.exports = UserRouter