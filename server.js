const app = require("./src/app")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const axios = require("axios")

//* Load ENV
const ProductionMode = process.env.MODE_ENV === "production"
if (!ProductionMode) {
    dotenv.config()
}

//* Database MongoDB Connection
async function ConnectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected Successfully: ${mongoose.connection.host}`);
    } catch (err) {
        console.log("Error in DB connection ->", err);
        process.exit(1)
    }
}

//* Run Server
function startServer() {
    const port = process.env.PORT || 3600;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });    
}

//* Function Run
async function run() {
    startServer()
    await ConnectToDB()
}

run()
