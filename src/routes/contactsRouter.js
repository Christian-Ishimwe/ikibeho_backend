const express= require("express")
const { homeContacts, sendMessage, getMessages, readMessage, deleteMessage, replyMessage } = require("../controllers/contactsController")
const {isVerified, isSuperAdmin}=require("../middleware/jwtVerify")
const contactRoute= express.Router()

contactRoute.get("/", homeContacts)
contactRoute.post("/send",sendMessage)
contactRoute.put("/reply/:id",isVerified, replyMessage)
contactRoute.get("/all", isVerified,getMessages)
contactRoute.get("/all/:id", isVerified, readMessage)
contactRoute.delete("/all/:id",isVerified, deleteMessage)
module.exports= contactRoute