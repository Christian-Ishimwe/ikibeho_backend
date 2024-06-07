const jwt= require("jsonwebtoken")
const User= require("../models/userModel")
const isVerified=async(req,res, next)=>{
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user= await User.findById(decoded.id)
    if(!user.active){
      return res.status(401).message({message: "Account is disabled!"})
    }
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }

}

const isSuperAdmin= async(req,res,next)=>{
    if(req.user.role!=="superadmin"){
        return res.status(401).json({message: "Access Denied, for admin only"})
    }
    next()
}

module.exports={isVerified, isSuperAdmin}