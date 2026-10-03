const express = require("express");
const { UserRegisterController, UserLoginController, UserLogoutController } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", UserRegisterController);
router.post("/login", UserLoginController);
router.post("/logout", authMiddleware, UserLogoutController);

module.exports = router;