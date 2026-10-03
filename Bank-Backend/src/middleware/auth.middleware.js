const userModel = require("../models/user.model") ;
const TokenBlacklistModel = require("../models/token-blacklist.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next){
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if(!token){
    return res.status(401).json({message:"Unauthorized, token is missing"});
  }

  try{
    const isBlacklisted = await TokenBlacklistModel.findOne({ token });
    if(isBlacklisted){
      return res.status(401).json({message:"Unauthorized, token has been logged out"});
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if(!user){
      return res.status(401).json({message:"Unauthorized, user not found"});
    }
    req.user = user;
    next();
  }catch(err){
    return res.status(401).json({message:"Unauthorized access, token is invalid or expired"});
  }
}

module.exports = {authMiddleware};