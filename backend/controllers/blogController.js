import blogModel from "../models/blogModel.js";
import fs from 'fs';



// add blog
const add=async(req,res)=>{

    const {title,description,category,author}=req.body;
    const blogImage=req.file;
    console.log(req.body)

    if(!blogImage){
      return  res.json({message:'the image is required'})
    }

    const blog=new blogModel({
        title:title,
        description:description,
        category:category,
        author:author,
        image:blogImage.filename
    })

    try{
        await blog.save();
        res.json({success:true,message:"Blog created"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
        
    }

}

// fetch user blogs

const getBlogs=async (req,res)=>{

    const {userId}=req.params;
    try{
        const userblogs=await blogModel.find({author:userId}).populate('author', 'name userImage').sort({_id:-1});
        res.json({success:true,userblogs})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:'error'})
    }
}


// fetch all blogs

const getAllBlogs=async(req,res)=>{

    try{
        const blogs = await blogModel.find().populate('author', 'name userImage').sort({_id:-1});    
            res.json({success:true,blogs})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:'error'})
    }
}


// delete a blog

const deleteBlog=async(req,res)=>{

    const {id}=req.params;
    try{
        const blog=await blogModel.findById(id)
        if(!blog){
           return res.json({success:false,message:'no blog found'})
        }
        
        fs.unlink(`uploads/blogImages/${blog.image}`,()=>{})
        await blogModel.findByIdAndDelete(id)
        res.json({success:true,message:'blog deleted successfuly'})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'error'})
    }
}


export {add,getBlogs,getAllBlogs,deleteBlog}