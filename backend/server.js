import express from 'express';
import cors from 'cors';
import  connectDB  from '../backend/config/db.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import blogRouter from './routes/blogRoute.js';


// app config
const app=express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())



// connect database
connectDB();

// api endpoints
app.use('/userprofile',express.static('uploads/userProfile'))//set the api route for upload folder
app.use('/blogimage',express.static('uploads/blogImages'))
app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)

app.get('/',(req,res)=>{
    res.send('api workinng')
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})