const express= require("express")
const bcrypt= require("bcrypt")
const User= require("../models/userModel")
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv").config()
const homeAdmin=(req, res)=>{
    return res.status(200).json({message: "Admin Dashboard"})
}
const registerUser = async (req, res) => {    
    try {
        const { email, phone } = req.body;

        const existing_user = await User.findOne({ email }) || await User.findOne({ phone });
        if (existing_user) {
            return res.status(400).json({ message: "Admin already exists with such credentials, email or phone" });
        }

        // Convert SALT_NUMBER to an integer
        const saltRounds = parseInt(process.env.SALT_NUMBER, 10);

        // Check if saltRounds is a valid number
        if (isNaN(saltRounds)) {
            throw new Error('Invalid salt rounds specified in environment variables');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;
        
        console.log(req.body);
        const new_user = new User(req.body);
        await new_user.save();
        return res.status(201).json({ message: "Admin Added", user: new_user });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};


const loginUser= async(req, res)=>{
    const {email, password}= req.body
    if( !email || !password){
        return res.status(401).json({message: "email and password required"})
    }
    try{
        const user= await User.findOne({email})
        if(user && bcrypt.compareSync(password, user.password)){
            if(!user.active){
                return res.status(401).json({message:  "Account Disabled!"})
            }
            const token = jwt.sign({id: user._id, role: user.role},process.env.SECRET_KEY, { expiresIn : "2d"})
            return res.status(200).json({message: "User signed in",
             email: user.email, token, role:user.role, id: user._id})
        }
        return res.status(404).json({message: "Invalid Email or password"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server error"})
    }
}

const getAllUsers= async (req,res)=>{
    try{
        const users= await User.find()
        return res.status(200).json(users)

    }catch(err){
        console.log(err)
        return res.status(500).json({message: "internal server error"})
    }
}

const userProfile=async(req, res)=>{
    try{
        const user_id= req.user.id
        const user= await User.findById(user_id)
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error!"})
    }
}

const activateAdmin=async(req,res)=>{
    const user_id= req.params.id
    if(!user_id){
        return res.status(400).json({message: "Admin id Required"})
    }
    try{
        const user= await User.findByIdAndUpdate(user_id, {
            active: true
        })
        await user.save()
        return res.status(201).json({message: "User activated"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server error"})
    }
}

const deactivateAdmin= async(req, res)=>{
    const user_id= req.params.id
    if(!user_id){
        return res.status(400).json({message: "Admin id Required"})
    }
    try{
        const user= await User.findByIdAndUpdate(user_id, {
            active: false
        })
        await user.save()
        return res.status(201).json({message: "User diactivated"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server error"})
    }
}

const changePassword= async(req,res)=>{
    const {password, confirmpassword}=req.body
    if(password!=confirmpassword){
        return res.status(400).json({message: "password must match"})
    }
    try{
        const user_id= req.user.id
        const hashedPassword = await bcrypt.hash(password, process.env.SALT_NUMBER);
        const user= await User.findByIdAndUpdate(user_id, {password:hashedPassword})
        await user.save()
        return res.status(201).json({message: "password updated successful"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteUser= async (req,res)=>{
    const user_id= req.params.id
    try{
        const user= await User.findByIdAndDelete(user_id)
        return res.status(204).json({message: "User deleted!"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }

}


module.exports={homeAdmin, registerUser,
     loginUser,userProfile, activateAdmin, deactivateAdmin,
        changePassword, getAllUsers,
    deleteUser}