import express from 'express';
import multer from 'multer';
import  { loginUser, registerUser,getUser, edituser } from '../controllers/userController.js';
const userRouter=express.Router();


// multer middleware
const storage=multer.diskStorage({
    destination:'uploads/userProfile',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const uploadUserProfile=multer({storage:storage})

userRouter.post('/login',loginUser);
userRouter.post('/register',uploadUserProfile.single('profile'),registerUser);
userRouter.get('/getuser',getUser);
userRouter.post('/edituser',uploadUserProfile.single('userImage'),edituser)


export default userRouter;