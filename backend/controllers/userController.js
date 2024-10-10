import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import  fs from 'fs';


// token function
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  const profile = req.file.filename;
  console.log(profile)

  try {
    
    email=email.trim().toLowerCase();
    // check user exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "user already exist" });
    }

    // check the email is valid or password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashed,
      userImage: profile,
    });

    // save the user
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userImage: user.userImage,
        postedBlogs: user.postedBlogs,
      },
    });
  } catch (error) {

    // remove uploaded file
    if(profile){
      fs.unlink(`/uploads/userProfile/${profile}`,()=>{})
    }

    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // check email is valid
    const user = await userModel.findOne({email});
    console.log(user)
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userImage: user.userImage,
        postedBlogs: user.postedBlogs,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// getuser
const getUser = async (req, res) => {
  try {
    const token = req.headers.token;

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await userModel.findById(decode.id);

    // Check if user exists
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Respond with user data
    res.json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      userImage: user.userImage,
      postedBlogs: user.postedBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// edituserprofile

const edituser = async (req, res) => {
  const data = req.body;
  const image = req.file;
  console.log(req.body)
  try {
    const user = await userModel.findOne({ email: data.currentEmail });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    if (data.newPassword) {
     const isMatch=await bcrypt.compare(data.oldPassword,user.password)
     if(!isMatch){
        return res.json({ success: false, message: "incorrect password" });
      }
      if (data.newPassword.length < 8) {
        return res.json({ success: false, message: "enter a strong password" });
      }
  
      // hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(data.newPassword, salt);
      // update password
      user.password=hashed;
    }

    // image
    if(image&&image!=user.userImage){
      if(user.userImage){
        fs.unlink(`uploads/userProfile/${user.userImage}`,(err)=>{
          console.log('error deleting old image',err)
        })
      }
      user.userImage=image.filename;
    }

    // name
    if(data.name){
      user.name=data.name;
    }
    
    if (data.newEmail && data.newEmail !== user.email) {
      const emailExists = await userModel.findOne({ email: data.newEmail });
      if (emailExists) {
        return res.status(409).json({ success: false, message: 'Email already in use' });
      }
      if (!validator.isEmail(data.newEmail)) {
        return res.json({ success: false, message: "please enter valid email" });
      }

      user.email = data.newEmail; // Update the email
    }

    await user.save();
    res.json(
      {success:true,
        message:'updated successfully',
        data:{
          id:user._id,
          name:user.name,
          email:user.email,
          userImage:user.userImage,
          password:user.Password
        }

      })


    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export default edituser;



export { registerUser, loginUser, getUser, edituser };
