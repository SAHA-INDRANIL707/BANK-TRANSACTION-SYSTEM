const mongoose = require("mongoose");
const LedgerModel = require("./ledger.model").LedgerModel;

const AccountSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
    index: true
  },
  status:{
    enum: ["active", "frozen", "closed"],
    message: "Status must be either 'active', 'frozen', or 'closed'",
    default: "active",
    type: String,
  },
  currency:{
    type: String,
    required: [true, "Currency is required"],
    default: "INR",
    enum: ["USD", "EUR", "GBP", "INR"]
  } 

},{
  timestamps: true
});

AccountSchema.index({user: 1, status: 1});

AccountSchema.methods.getBalance = async function() {
  return LedgerModel.getAccountBalance(this._id);
};

const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = AccountModel;