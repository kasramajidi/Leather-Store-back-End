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

CriticismsRouter
    .route("/:id")
    .delete(CriticismsControllers.remove)
    .put(CriticismsControllers.update)

CriticismsRouter
    .route("/confirm/:id")
    .put(CriticismsControllers.confirm)

CriticismsRouter
    .route("/confirm")
    .get(CriticismsControllers.confirmedTrue)

module.exports = CriticismsRouter