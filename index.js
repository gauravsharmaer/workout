const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" })
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

const workoutRoutes = require("./routes/workouts")



app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

app.use("/api/workouts", workoutRoutes)
mongoose.connect(process.env.MONGO)
    .then(() => {
        const port = process.env.PORT
        app.listen(port, () => {
            console.log("sun rha hu 8080 pe");
        })
    }).catch((error) => {
        console.log(error);
    })