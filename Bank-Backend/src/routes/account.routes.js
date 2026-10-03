const express = require("express");
const {authMiddleware} = require("../middleware/auth.middleware");

const { createAccount, fetchAccountBalance } = require("../controllers/account.controller");

const router = express.Router();

router.post("/create", authMiddleware, createAccount);
router.get("/balance/:account_id", authMiddleware, fetchAccountBalance);

module.exports = router;