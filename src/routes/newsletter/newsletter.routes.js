const express = require("express")
const NewsletterController = require("./../../controllers/newsletter/NewsletterController")
const NewsletterRouter = express.Router()

NewsletterRouter
    .route("/create")
    .post(NewsletterController.create)

NewsletterRouter
    .route("/getall")
    .get(NewsletterController.getAll)

NewsletterRouter
    .route("/:id")
    .delete(NewsletterController.remove)
    .put(NewsletterController.update)

module.exports = NewsletterRouter;
