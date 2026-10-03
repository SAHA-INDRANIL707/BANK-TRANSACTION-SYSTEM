const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
};

async function sendWelcomeEmail({ to, name }) {
  try {
    if (!to) {
      throw new Error("Recipient email is required");
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Bank App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Welcome to Bank App",
      text: `Hi ${name || "there"}, your account has been created successfully.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome, ${name || "there"}!</h2>
          <p>Your account has been created successfully.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error.message);
    return { success: false, error: error.message };
  }
}

async function sendTransactionEmails({
  sender,
  receiver,
  amount,
  transactionId,
  currency,
}) {
  if (!sender?.email || !receiver?.email) {
    throw new Error("Sender and receiver email addresses are required");
  }

  const transporter = createTransporter();
  const formattedAmount = `${amount} ${currency || ""}`.trim();

  const [senderResult, receiverResult] = await Promise.allSettled([
    transporter.sendMail({
      from: `"Bank App" <${process.env.EMAIL_USER}>`,
      to: sender.email,
      subject: "Transaction debit confirmation",
      text: `Hi ${sender.name || "there"}, ${formattedAmount} was debited from your account. Transaction ID: ${transactionId}.`,
      html: `<div style="font-family: Arial, sans-serif;">
        <h2>Transaction debit confirmation</h2>
        <p>Hi ${sender.name || "there"},</p>
        <p><strong>${formattedAmount}</strong> was debited from your account.</p>
        <p>Transaction ID: ${transactionId}</p>
      </div>`,
    }),
    transporter.sendMail({
      from: `"Bank App" <${process.env.EMAIL_USER}>`,
      to: receiver.email,
      subject: "Transaction credit confirmation",
      text: `Hi ${receiver.name || "there"}, ${formattedAmount} was credited to your account. Transaction ID: ${transactionId}.`,
      html: `<div style="font-family: Arial, sans-serif;">
        <h2>Transaction credit confirmation</h2>
        <p>Hi ${receiver.name || "there"},</p>
        <p><strong>${formattedAmount}</strong> was credited to your account.</p>
        <p>Transaction ID: ${transactionId}</p>
      </div>`,
    }),
  ]);

  const failures = [senderResult, receiverResult]
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message || "Unknown email error");

  if (failures.length > 0) {
    console.error("Transaction email send failed:", failures.join("; "));
  }

  return {
    success: failures.length === 0,
    failures,
  };
}

async function sendDepositEmail({ receiver, amount, currency, transactionId }) {
  if (!receiver?.email) {
    throw new Error("Receiver email address is required");
  }

  try {
    const transporter = createTransporter();
    const formattedAmount = `${amount} ${currency || ""}`.trim();

    await transporter.sendMail({
      from: `"Bank App" <${process.env.EMAIL_USER}>`,
      to: receiver.email,
      subject: "Account Deposit Confirmation",
      text: `Hi ${receiver.name || "there"}, ${formattedAmount} was successfully deposited into your account. Transaction ID: ${transactionId}.`,
      html: `<div style="font-family: Arial, sans-serif;">
        <h2>Deposit Confirmation</h2>
        <p>Hi ${receiver.name || "there"},</p>
        <p><strong>${formattedAmount}</strong> has been successfully credited into your account.</p>
        <p>Transaction ID: ${transactionId}</p>
      </div>`,
    });

    return { success: true };
  } catch (error) {
    console.error("Deposit email send failed:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendWelcomeEmail,
  sendTransactionEmails,
  sendDepositEmail,
};