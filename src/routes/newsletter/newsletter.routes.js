const express = require("express")
const NewsletterController = require("./../../controllers/newsletter/NewsletterController")
const NewsletterRouter = express.Router()

NewsletterRouter
    .route("/create")
    .post(NewsletterController.create)

NewsletterRouter
    .route("/getall")
    .get(NewsletterController.getAll)

module.exports = NewsletterRouter;
