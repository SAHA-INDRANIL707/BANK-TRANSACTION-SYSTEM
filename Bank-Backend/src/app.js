const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

//routes required
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
const transactionRouter = require("./routes/transaction.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);
app.use("/api/transaction", transactionRouter);

app.get("/",(req,res)=>{
    res.json({
        message:"Hello World",
    })
})

// Global error handling middleware for invalid JSON payloads
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload format in request body" });
  }
  return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
