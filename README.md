# 🏦 CIE Bank — Full-Stack Banking Application

A full-stack banking web application with a **Next.js 16** frontend and an **Express.js** REST API backend, backed by **MongoDB Atlas**.

---

## 📁 Project Structure

```
Bank/
├── Bank-Backend/          # Express.js REST API
│   ├── src/
│   │   ├── app.js         # Express app setup, middleware, routes
│   │   ├── server.js      # Entry point — DB connection & server start
│   │   ├── config/
│   │   │   └── db.js      # MongoDB connection
│   │   ├── controllers/   # Route handler logic
│   │   │   ├── auth.controller.js
│   │   │   ├── account.controller.js
│   │   │   └── transaction.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   └── admin.middleware.js  # Admin-only guard
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── account.model.js
│   │   │   ├── transaction.model.js
│   │   │   ├── ledger.model.js
│   │   │   └── token-blacklist.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── account.routes.js
│   │   │   └── transaction.routes.js
│   │   └── services/
│   │       └── email.service.js     # Nodemailer email service
│   ├── .env               # ⚠️ Secret — never commit (see .env.example)
│   ├── .env.example       # ✅ Safe template to share
│   └── package.json
│
├── Bank-Frontend/         # Next.js 16 + TypeScript + Tailwind CSS
│   ├── app/
│   │   ├── page.tsx       # Landing / Login page
│   │   ├── signup/        # Signup page
│   │   └── dashboard/     # Dashboard (protected)
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions / API helpers
│   ├── types/             # TypeScript type definitions
│   └── package.json
│
├── .gitignore             # Root-level ignore rules
└── README.md              # This file
```

---

## 🔧 Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | Comes with Node.js |
| Git | Latest | https://git-scm.com |
| MongoDB Atlas account | — | https://www.mongodb.com/atlas |

---

## ⚙️ Environment Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Bank
```

### 2. Configure Backend Environment Variables

```bash
cd Bank-Backend
copy .env.example .env
```

Now open `.env` and fill in **your real values**:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>
PORT=3000
JWT_SECRET=your_strong_random_secret_here
CLIENT_ID=your_google_client_id.apps.googleusercontent.com
CLIENT_SECRET=your_google_client_secret
REFRESH_TOKEN=your_google_refresh_token
EMAIL_USER=your_email@gmail.com
```

> **How to get these values:**
> - **MONGO_URI** → MongoDB Atlas → your cluster → Connect → Drivers → copy the connection string
> - **JWT_SECRET** → Run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
> - **CLIENT_ID / CLIENT_SECRET / REFRESH_TOKEN** → Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client

---

## 🚀 Running the Project

### Option A — Run Both Together (Two Terminals)

**Terminal 1 — Backend:**
```bash
cd Bank-Backend
npm install
npm run dev
```
> Backend runs at: **http://localhost:3000**

**Terminal 2 — Frontend:**
```bash
cd Bank-Frontend
npm install
npm run dev
```
> Frontend runs at: **http://localhost:3001** (or next available port)

---

### Option B — Production Mode

```bash
# Backend
cd Bank-Backend
npm start

# Frontend (in a separate terminal)
cd Bank-Frontend
npm run build
npm start
```

---

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:-------------:|-------------|
| `POST` | `/register` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and receive JWT cookie |
| `POST` | `/logout` | ✅ | Logout and invalidate token |

**Register — Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Login — Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

---

### 🏦 Account Routes — `/api/account`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:-------------:|-------------|
| `POST` | `/create` | ✅ | Create a new bank account |
| `GET`  | `/balance/:account_id` | ✅ | Fetch balance for an account |

---

### 💸 Transaction Routes — `/api/transaction`

| Method | Endpoint | Auth Required | Admin Only | Description |
|--------|----------|:-------------:|:----------:|-------------|
| `POST` | `/transfer` | ✅ | ❌ | Transfer money between accounts |
| `POST` | `/deposit` | ✅ | ✅ | Deposit money into an account |

**Transfer — Request Body:**
```json
{
  "from_account_id": "ACC123",
  "to_account_id": "ACC456",
  "amount": 500
}
```

**Deposit — Request Body:**
```json
{
  "account_id": "ACC123",
  "amount": 1000
}
```

---

## 🗄️ Database Models

| Model | Description |
|-------|-------------|
| `User` | Stores user credentials, role, and profile |
| `Account` | Bank account linked to a user |
| `Transaction` | Record of each transfer between accounts |
| `Ledger` | Double-entry ledger entries per transaction |
| `TokenBlacklist` | Invalidated JWT tokens (for secure logout) |

---

## 🛡️ Authentication Flow

1. User logs in → server issues a **JWT** stored in an **HTTP-only cookie**
2. Protected routes verify the token via `authMiddleware`
3. On logout → token is added to the **TokenBlacklist** collection
4. Blacklisted tokens are rejected on subsequent requests

---

## 🧰 Tech Stack

### Backend
| Package | Purpose |
|---------|---------|
| `express` v5 | HTTP framework |
| `mongoose` | MongoDB ODM |
| `jsonwebtoken` | JWT auth |
| `bcryptjs` | Password hashing |
| `nodemailer` | Email service |
| `cookie-parser` | HTTP cookie parsing |
| `cors` | Cross-Origin Resource Sharing |
| `dotenv` | Environment variable loader |
| `nodemon` | Dev auto-restart |

### Frontend
| Package | Purpose |
|---------|---------|
| `next` v16 | React framework (App Router) |
| `react` v19 | UI library |
| `typescript` | Type safety |
| `tailwindcss` v4 | Utility-first CSS |
| `motion` | Animations (Framer Motion) |
| `react-icons` | Icon library |

---

## 🐛 Common Issues & Fixes

### ❌ `MongoServerError: bad auth`
Your `MONGO_URI` credentials are wrong. Go to MongoDB Atlas → Database Access → reset password and update `.env`.

### ❌ `Cannot find module 'dotenv'`
You haven't installed dependencies. Run `npm install` inside `Bank-Backend/`.

### ❌ `Port 3000 is already in use`
Another process is using port 3000. Either kill it or change `PORT` in `.env`.
```powershell
# Find and kill the process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ Frontend can't reach the backend (CORS error)
Make sure the backend is running on `http://localhost:3000` and CORS is configured correctly in `app.js`.

---

## 📝 Scripts Reference

| Directory | Command | What it does |
|-----------|---------|-------------|
| `Bank-Backend` | `npm run dev` | Start backend with nodemon (auto-restart) |
| `Bank-Backend` | `npm start` | Start backend (production) |
| `Bank-Frontend` | `npm run dev` | Start Next.js dev server |
| `Bank-Frontend` | `npm run build` | Build for production |
| `Bank-Frontend` | `npm start` | Start Next.js production server |
| `Bank-Frontend` | `npm run lint` | Run ESLint |

---

## 🔐 Security Notes

- **Never commit `.env`** — it's listed in `.gitignore`
- Use `.env.example` as a template for new team members
- JWT tokens are stored in **HTTP-only cookies** (not localStorage) to prevent XSS
- Passwords are hashed with **bcryptjs** before storing in the database
- Logged-out tokens are blacklisted to prevent reuse

---

## 👤 Author

**Indranil Saha**
