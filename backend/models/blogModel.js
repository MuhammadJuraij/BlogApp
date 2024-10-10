import mongoose from "mongoose";



const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    date:{type:Date,default:Date.now()},
    image:{type:String,required:true}

})

const blogModel=mongoose.models.blog ||mongoose.model('blog',blogSchema);


export default blogModel;