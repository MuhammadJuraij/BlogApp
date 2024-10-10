import express from 'express';
import multer from 'multer';
import  { add, deleteBlog, getAllBlogs, getBlogs } from '../controllers/blogController.js';
const blogRouter=express.Router();


// multer middleware
const storage=multer.diskStorage({
    destination:'uploads/blogImages',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const uploadBlogImage=multer({storage:storage})


blogRouter.post('/add',uploadBlogImage.single('blogImage'),add);
blogRouter.get('/getblogs/:userId',getBlogs)
blogRouter.get('/getall',getAllBlogs)
blogRouter.delete('/delete/:id',deleteBlog)


export default blogRouter;