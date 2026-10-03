const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:[true,"email is required for creating a user"],
    unique:[true,"email already exists"],
    trim:true,
    lowercase:true,
    match:[/^[\w\.-]+@[\w\.-]+\.\w+$/, "Please enter a valid email"]
  },
  password:{
    type:String,
    required:[true,"password is required for creating an account"],
    minLength:[4,"password must be at least 4 characters long"],
    select:false
  },
  name:{
    type:String,
    required:[true,"name is required for creating an account"]  
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
},{
  timestamps:true
})

userSchema.pre("save",async function(){
  if(!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;