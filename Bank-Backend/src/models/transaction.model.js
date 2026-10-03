const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: function() {
      return this.type === "transfer";
    },
    index: true
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"]
  },
  type: {
    type: String,
    enum: ["transfer", "deposit", "withdrawal"],
    default: "transfer"
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "reversed"],
    default: "pending"
  },
  idempotencyKey: {
    type: String,
    required:[true, "Idempotency key is required"],
    unique: true,
    index: true
  }
},{ timestamps: true});


const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = {TransactionModel};