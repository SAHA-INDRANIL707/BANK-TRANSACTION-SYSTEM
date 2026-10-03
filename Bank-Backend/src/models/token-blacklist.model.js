const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required for blacklisting"],
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 // TTL index: Automatically deleted after 30 days (2592000 seconds)
  }
});

const TokenBlacklistModel = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklistModel;
