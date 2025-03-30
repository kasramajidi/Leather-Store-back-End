const express = require("express")
const app = express()
const cookieParse = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const AuthRouter = require("./routes/auth/auth.routes")
const SwaggerRouter = require("./routes/api/swagger.routes")
const UserRouter  = require("./routes/user/user.routes")
const NewsletterRouter = require("./routes/newsletter/newsletter.routes")
//* bodyParser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//*cookie parser
app.use(cookieParse())
app.use(cors())

//* Routes
app.use("/auth", AuthRouter);
app.use("/api", SwaggerRouter)
app.use("/user", UserRouter)
app.use("/newsletter", NewsletterRouter)

//* 404 Error Handelr
app.use((req,res) => {
    console.log("this path is not found:", req.path);
    return res.status(404).json({
        message: "404! Path Not Found. Please check the path/method"
    })
})

module.exports = app