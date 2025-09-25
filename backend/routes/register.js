const express = require('express');
const { User } = require('../DB/schema');
const registerRoute = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authChecker } = require('../Middleware/authChecker');

registerRoute.post("/signup", async(req, res)=>{
    const {username, email, password,confirmPassword, role} = req.body;
    console.log(username, email, password,confirmPassword,)
    try{
        if(!username || !email || !password || !confirmPassword ){
            return res.status(400).json({error: "All fields are required"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error: "User already exists"})
        }

        if(password !== confirmPassword){
            return res.status(400).json({error: "Password and confirm password do not match"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({username, email, password: hashedPassword, role})
        res.status(201).json({message: "User created successfully"})
    }catch(error){
        res.status(404).json({
            error: error
        })
    }
})

registerRoute.post("/signin", async(req, res)=>{
    const {email, password} = req.body;
    console.log(email, password)
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.status(200).json({
            token:token,
            message: "User logged in successfully"
        })
    }
    catch(error){
        res.status(404).json({message: "User not found"})
    }
    
})
registerRoute.get("/profile", authChecker, async(req, res)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({user})
})

module.exports = {
    registerRoute
}