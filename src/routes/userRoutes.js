const express= require("express")
const userRouter= express.Router()
const {homeAdmin, registerUser, loginUser, userProfile, getAllUsers, deactivateAdmin, activateAdmin, changePassword, deleteUser, update_phone}= require("../controllers/userController")
const { isVerified, isSuperAdmin } = require("../middleware/jwtVerify")

userRouter.get("/",homeAdmin)
userRouter.delete("/:id", isVerified, isSuperAdmin, deleteUser)
userRouter.post("/register",isVerified, isSuperAdmin, registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile",isVerified, userProfile)
userRouter.get("/all",isVerified,isSuperAdmin, getAllUsers)
userRouter.put("/update-phone", isVerified, update_phone)
userRouter.put("/diactivate/:id", isVerified, isSuperAdmin, deactivateAdmin)
userRouter.put("/activate/:id", isVerified, isSuperAdmin, activateAdmin)
userRouter.put("/changepassword", isVerified, changePassword)

module.exports= userRouter
