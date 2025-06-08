import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import router from "./routes/authRouter.js"
import cors from "cors"

dotenv.config()
const port = process.env.PORT
const db = process.env.DB_URL

mongoose.connect(db)
.then((res) => console.log("db is connected"))
.catch((err) => console.log(err.message))

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/", router)

app.listen(port, () => console.log("app is connected", port))