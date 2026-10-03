const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true,
    immutable: true
  },
  amount: {
    type: Number,
    required: true,
    immutable: true
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
    index: true,
    immutable: true
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
    immutable: true
  }
},{ timestamps: true});

const PreventLedgerModification = function(next) {
  if (this.isModified()) {
    return next(new Error("Ledger entries cannot be modified"));
  }
  next();
};

ledgerSchema.pre("updateOne", PreventLedgerModification);
ledgerSchema.pre("findOneAndUpdate", PreventLedgerModification);
ledgerSchema.pre("updateMany", PreventLedgerModification);
ledgerSchema.pre("deleteOne", PreventLedgerModification);
ledgerSchema.pre("findOneAndDelete", PreventLedgerModification);
ledgerSchema.pre("findOneAndRemove", 
PreventLedgerModification);
ledgerSchema.pre("findOneAndReplace", PreventLedgerModification);
ledgerSchema.pre("deleteMany", PreventLedgerModification);
ledgerSchema.pre("remove", PreventLedgerModification);

ledgerSchema.statics.getAccountBalance = async function(accountId) {
  const [balanceResult] = await this.aggregate([
    { $match: { account: accountId } },
    {
      $group: {
        _id: null,
        totalCredits: {
          $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] }
        },
        totalDebits: {
          $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] }
        }
      }
    },
    {
      $project: {
        _id: 0,
        balance: { $subtract: ["$totalCredits", "$totalDebits"] }
      }
    }
  ]);

  return balanceResult ? balanceResult.balance : 0;
};

const LedgerModel = mongoose.model("Ledger", ledgerSchema);

module.exports = {LedgerModel};