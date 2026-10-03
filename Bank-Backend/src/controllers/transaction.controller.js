
const mongoose = require("mongoose");
const { TransactionModel } = require("../models/transaction.model");
const { LedgerModel } = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const { sendTransactionEmails, sendDepositEmail } = require("../services/email.service");


async function createTransaction(req,res){
  const {fromAccountId, toAccountId, amount,idempotencyKey} = req.body;
  const user = req.user;
    if(!user){
    return res.status(401).json({message:"Unauthorized"});
  }
  if(!fromAccountId || !toAccountId || !amount || !idempotencyKey){
    return res.status(400).json({message:"Missing required fields"});

  }
  const fromAccount = await accountModel.findById(fromAccountId).populate("user");
  const toAccount = await accountModel.findById(toAccountId).populate("user");
  if(!fromAccount || !toAccount){
    return res.status(400).json({message:"Invalid account IDs"});
  }
  //check if the user is authorized to perform the transaction
  if(fromAccount.user._id.toString() !== user._id.toString()){
    return res.status(403).json({message:"You are not authorized to perform this transaction"});

  }
  //check if transaction with the same idempotency key already exists
  const existingTransaction = await TransactionModel.findOne({idempotencyKey});
  if(existingTransaction){
    if(existingTransaction.status === "completed"){
      return res.status(200).json({message:"Transaction already completed", transaction: existingTransaction});
    }
    if(existingTransaction.status === "pending"){
      return res.status(200).json({message:"Transaction is already in progress", transaction: existingTransaction});
    }
    if(existingTransaction.status === "failed"){
      return res.status(200).json({message:"Transaction has failed previously", transaction: existingTransaction});
    }
    if(existingTransaction.status === "reversed"){
      return res.status(200).json({message:"Transaction has been reversed previously,please try again later", transaction: existingTransaction});
    }
  }
  //check account status
  if(fromAccount.status !== "active" || toAccount.status !== "active"){
    return res.status(400).json({message:"One or both accounts are not active"});
  }

  //derive sender balance from ledger
  const senderBalance = await fromAccount.getBalance();
  if(senderBalance < amount){
    return res.status(400).json({message:`Insufficient funds in the sender's account. Available balance: ${senderBalance}`});
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  let transaction;

  try {
    const transactions = await TransactionModel.create([{
      fromAccount: fromAccountId,
      toAccount: toAccountId,
      amount,
      type: "transfer",
      idempotencyKey,
      status: "pending"
    }], { session });
    transaction = transactions[0];

    await LedgerModel.create([{
      account: fromAccountId,
      transaction: transaction._id,
      type: "debit",
      amount
    }], { session });

    await LedgerModel.create([{
      account: toAccountId,
      transaction: transaction._id,
      type: "credit",
      amount
    }], { session });

    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      const existing = await TransactionModel.findOne({ idempotencyKey });
      if (existing) {
        return res.status(200).json({ message: "Transaction already processed", transaction: existing });
      }
    }
    return res.status(500).json({ message: "Transaction failed", error: error.message });
  }

  try {
    await sendTransactionEmails({
      sender: fromAccount.user,
      receiver: toAccount.user,
      amount,
      currency: fromAccount.currency,
      transactionId: transaction._id.toString(),
    });
  } catch (error) {
    console.error("Transaction notification failed:", error.message);
  }

  return res.status(201).json({message:"Transaction completed successfully", transaction});
}

async function depositMoney(req, res) {
  const { toAccountId, amount, idempotencyKey } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!toAccountId || !amount || !idempotencyKey) {
    return res.status(400).json({ message: "Missing required fields: toAccountId, amount, idempotencyKey" });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: "Deposit amount must be greater than zero" });
  }

  const toAccount = await accountModel.findById(toAccountId).populate("user");
  if (!toAccount) {
    return res.status(400).json({ message: "Invalid target account ID" });
  }

  if (toAccount.status !== "active") {
    return res.status(400).json({ message: "Target account is not active" });
  }

  // Check idempotency
  const existingTransaction = await TransactionModel.findOne({ idempotencyKey });
  if (existingTransaction) {
    if (existingTransaction.status === "completed") {
      return res.status(200).json({ message: "Deposit transaction already completed", transaction: existingTransaction });
    }
    if (existingTransaction.status === "pending") {
      return res.status(200).json({ message: "Deposit transaction is already in progress", transaction: existingTransaction });
    }
    if (existingTransaction.status === "failed") {
      return res.status(200).json({ message: "Deposit transaction has failed previously", transaction: existingTransaction });
    }
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  let transaction;

  try {
    const transactions = await TransactionModel.create([{
      toAccount: toAccountId,
      amount,
      type: "deposit",
      idempotencyKey,
      status: "pending"
    }], { session });
    transaction = transactions[0];

    await LedgerModel.create([{
      account: toAccountId,
      transaction: transaction._id,
      type: "credit",
      amount
    }], { session });

    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      const existing = await TransactionModel.findOne({ idempotencyKey });
      if (existing) {
        return res.status(200).json({ message: "Deposit transaction already processed", transaction: existing });
      }
    }
    return res.status(500).json({ message: "Deposit transaction failed", error: error.message });
  }

  const newBalance = await toAccount.getBalance();

  try {
    await sendDepositEmail({
      receiver: toAccount.user,
      amount,
      currency: toAccount.currency,
      transactionId: transaction._id.toString(),
    });
  } catch (error) {
    console.error("Deposit notification failed:", error.message);
  }

  return res.status(201).json({
    message: "Deposit completed successfully",
    transaction,
    newBalance
  });
}

module.exports = {
  createTransaction,
  depositMoney,
};