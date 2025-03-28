const express = require("express")
const UserController = require("./../../controllers/user/UserController")
const UserRouter = express.Router()

UserRouter
    .route("/getAllUser")
    .get(UserController.getAllUser)

UserRouter
    .route("/getuser/:id")
    .get(UserController.getByID)
    
module.exports = UserRouter