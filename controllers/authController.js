import User from "../models/authModels.js";
import bcrypt from "bcrypt"

export const Signup = async (req, res) => {
    try {
      const {fullname, email, password} = req.body 
      
      if(!fullname || !email || !password) return res.status(400).json({message: "all fields are required"})

      const user = new User(req.body)
      await user.save()

      res.status(201).json({
        message: "Register successfully"
    })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const Login = async (req, res) => {
    try {
       const {email, password} = req.body 

       if(!email || !password) return res.status(400).json({message: "Email and password is required"})
       
       const user = await User.findOne({email})
       if(!user) return res.status(404).json({message: "User not found"})
       
       const passwordCheck = await user.comparePassword(password)
       if(!passwordCheck) return res.status(401).json({message: "Incorrect password"})

        res.status(200).json({message: "Login successfully"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


