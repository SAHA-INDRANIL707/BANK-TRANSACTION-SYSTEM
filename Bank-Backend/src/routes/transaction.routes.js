const router = require("express").Router();

const { createTransaction, depositMoney } = require("../controllers/transaction.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { adminMiddleware } = require("../middleware/admin.middleware");

router.post("/transfer", authMiddleware, createTransaction);
router.post("/deposit", authMiddleware, adminMiddleware, depositMoney);

module.exports = router;