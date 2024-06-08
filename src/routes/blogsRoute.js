const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' }); // Adjust this as needed
const {isVerified}= require("../middleware/jwtVerify")

const express= require("express")
const {homeBlog, addBlog, getBlogs, oneBlog, updateBlog, deleteBlog}=require("../controllers/blogsController")
const blogsRoute= express.Router()

blogsRoute.get("/", getBlogs)
blogsRoute.get("/:id", oneBlog)
blogsRoute.put("/:id", isVerified, updateBlog)
blogsRoute.delete("/:id", isVerified, deleteBlog)
blogsRoute.post("/add", upload.array("images", 10),isVerified ,addBlog)
module.exports=blogsRoute

