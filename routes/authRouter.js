import express from "express"
import { Login, Signup } from "../controllers/authController.js"

const router = express.Router()

router.get("/signup", (req, res) => {
    res.send("sign up")
})
router.get("/login", (req, res) => {
    res.send("login page")
})

router.post("/api/signup", Signup)
router.post("/api/login", Login)

export default router