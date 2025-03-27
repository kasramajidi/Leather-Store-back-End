const app = require("./src/app")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

//* Load ENV

const ProductionMode = process.env.MODE_ENV === "production"
if (!ProductionMode) {
    dotenv.config()
}

//* database mongodb connection

async function ConnectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected Successfully: ${mongoose.connection.host}`);
    } catch (err) {
        console.log("Error in DB connection ->", err);
        process.exit(1)
    }
}

//* run server 

function startServer() {
    const port = process.env.PORT || 3600
    app.listen(port, () => {
        console.log(
            `Server running in ${ProductionMode ? "production" : "development"
            } mode on port ${port}`
        );

    })
}


//* function run 


async function run() {
    startServer()
    await ConnectToDB()
}

run()