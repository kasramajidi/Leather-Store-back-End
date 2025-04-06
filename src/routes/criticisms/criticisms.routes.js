const express = require("express")
const CriticismsControllers = require("./../../controllers/criticisms/CriticismsControllers")
const auth = require("../../middlewares/auth")
const CriticismsRouter = express.Router()

CriticismsRouter
    .route("/create")
    .post(auth, CriticismsControllers.create)

CriticismsRouter
    .route("/getall")
    .get(CriticismsControllers.getAll)
module.exports = CriticismsRouter