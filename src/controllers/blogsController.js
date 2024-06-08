const cloudinary= require("../helper/imageupload")
const Blog= require("../models/blogsModel")
const homeBlog=async(req,res)=>{
    return res.status(200).json({message: "blogs Home"})
}

const addBlog=async(req,res)=>{
    try{
        const {title,summary,content}= req.body
        const imagePaths = req.files.map(file => file.path);
        const imageUrls = [];
        for (const path of imagePaths) {
            const result = await cloudinary.uploader.upload(path);
            imageUrls.push(result.secure_url);
        }
        const author= req.user.id
        let new_blog={title,content, author,imageUrls}
        new_blog=await Blog(new_blog)
        await new_blog.save()
        return res.status(201).json({message:"Blog added", new_blog})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "internal server error"})
    }
}


const getBlogs=async(req,res)=>{
    try{
        const blogs= await Blog.find()
        if(blogs.length<=0){
            return res.status(404).json({message: "No Blogs yet"})
        }
        return res.status(200).json({message: "Blogs available", blogs})

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}



const updateBlog = async (req, res) => {
    try {
        const blog_id = req.params.id;

        if (!blog_id) {
            return res.status(400).json({ message: "Blog id required" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blog_id, req.body, { new: true }).populate('author', 'firstname lastname email');

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json(updatedBlog);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog_id = req.params.id;

        if (!blog_id) {
            return res.status(400).json({ message: "Blog id required" });
        }
        const deleted_blog= await Blog.findByIdAndDelete(blog_id)


        if (!deleteBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(204).send("blog deleted")
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const oneBlog=async(req,res)=>{
    try{
        const blog_id= req.params.id
        if(!blog_id){
            return res.status(400).json({message: "Blog id required"})
        }
        const blog= await Blog.findById(blog_id)
        if (!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        return res.status(200).json(blog)
        
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}


module.exports={homeBlog, addBlog, getBlogs,oneBlog, updateBlog, deleteBlog}