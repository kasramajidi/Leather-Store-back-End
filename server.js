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
    const port = process.env.PORT || 3600
    app.listen(port, () => {
        console.log(
            `Server running in ${ProductionMode ? "production" : "development"
            } mode on port ${port}`
        );
    });

    setInterval(() => {
        axios.get("https://leather-store-back-end.onrender.com")
            .then(() => console.log("Pinged the server to keep it awake."))
            .catch(err => console.error("Error pinging server:", err));
    }, 5 * 60 * 1000);
}

//* Function Run
async function run() {
    startServer()
    await ConnectToDB()
}

run()
