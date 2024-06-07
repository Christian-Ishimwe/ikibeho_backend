const express= require("express")
const userRouter= express.Router()
const {homeAdmin, registerUser, loginUser, userProfile, getAllUsers, deactivateAdmin, activateAdmin}= require("../controllers/userController")
const { isVerified, isSuperAdmin } = require("../middleware/jwtVerify")

userRouter.get("/",homeAdmin)
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile",isVerified, userProfile)
userRouter.get("/all",isVerified,isSuperAdmin, getAllUsers)
userRouter.put("/diactivate/:id", isVerified, isSuperAdmin, deactivateAdmin)
userRouter.put("/activate/:id", isVerified, isSuperAdmin, activateAdmin)

module.exports= userRouter
