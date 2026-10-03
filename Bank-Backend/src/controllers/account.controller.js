const mongoose = require("mongoose");
const AccountModel = require("../models/account.model");

async function createAccount(req,res){
  const user = req.user;

  const account = await AccountModel.create({
    user: user._id,
  });
  return res.status(201).json({message:"Account created successfully", account});
}  

async function fetchAccountBalance(req,res){
  //we need to get the account id first then check if the account id belogns to the user logged in or not . we cant take user id because one user can have multiple account 
  const {account_id} = req.params;
  if(!account_id || !mongoose.Types.ObjectId.isValid(account_id)){
    return res.status(400).json({message:"Invalid or missing Account ID"});
  }
  const account = await AccountModel.findById(account_id);
  if(!account){
    return res.status(404).json({message:"Account not found"});
  }
  if(account.user.toString() !== req.user._id.toString()){
    return res.status(403).json({message:"You are not authorized to access this account"});
  }
  const balance = await account.getBalance();
  return res.status(200).json({balance});
}


module.exports = {createAccount, fetchAccountBalance};