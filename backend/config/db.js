import mongoose from "mongoose";

const connectDB= async()=>{
await mongoose.connect('mongodb+srv://juraij:587245@cluster0.9n9jg.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=BlogApp').then(()=>{console.log('DB connected')});
}

export default connectDB;