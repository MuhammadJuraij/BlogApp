import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userImage:{type:String,required:true},
    postedBlogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog' //reference to the Blog model
    }]

})

const userModel= mongoose.models.user || mongoose.model('user',userSchema);


export default userModel;