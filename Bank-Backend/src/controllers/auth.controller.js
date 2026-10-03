const userModel = require("../models/user.model") ;
const TokenBlacklistModel = require("../models/token-blacklist.model");
const {sendWelcomeEmail} = require("../services/email.service");
const jwt = require("jsonwebtoken");



async function UserRegisterController(req,res){ 
  const {email,password,name,role} = req.body;
  try{
    const userExists = await userModel.findOne({email});
    if(userExists){
      return res.status(400).json({message:"User already exists"});
    }
    const user = await userModel.create({
      email,
      password,
      name,
      ...(role && { role })
    });
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      maxAge:259200000,
      sameSite:"strict"
    });
    user.password = undefined;
    const result = {
      user,
      token
    };
    
    res.status(201).json({message:"User registered successfully",result});
    await sendWelcomeEmail({ to: email, name });
  }catch(error){
    res.status(500).json({message:error.message});
  }
}


async function UserLoginController(req,res){
  const {email,password} = req.body;  
  try{
    const user = await userModel.findOne({ email }).select("+password");
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      maxAge:259200000,
      sameSite:"strict"
    });
    user.password = undefined;
    const result = {
      user,
      token
    };
    
    res.status(200).json({message:"User logged in successfully",result});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

async function UserLogoutController(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided to logout" });
  }

  try {
    await TokenBlacklistModel.create({ token }).catch(err => {
      if (err.code !== 11000) throw err;
    });

    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  UserRegisterController,
  UserLoginController,
  UserLogoutController,
};