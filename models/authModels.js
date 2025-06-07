import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'User already exits'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        trim: true
    }
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    try {
        this.password = await bcrypt.hash(this.password, 12)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password)
}

const User = model("User", userSchema)

export default User