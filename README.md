#  User Authentication System

A secure and scalable user authentication backend built with **Node.js**, **Express**, and **MongoDB**, featuring email and phone verification, password reset, and session management.

---

## ✨ Features

This authentication system is designed for real-world scalability, security, and clarity. It handles the full lifecycle of user access with robust verification, session management, and recovery flows.

### 📝 Registration & Verification
- Users can register with **email or phone number**, choosing their preferred verification method.
- OTP is sent via:
  - 📧 **Email** using Nodemailer
  - 📲 **SMS** using Twilio
- OTP expires after **10 minutes** and is required to activate the account.
- Each email/phone is allowed **3 verification attempts** to prevent abuse.
- Unverified accounts are automatically deleted after **30 minutes** via a scheduled cron job.

### 🔐 Login & Logout
- Login with verified email and password.
- Sessions are managed using **JWT tokens** stored in **HTTP-only cookies**.
- Logout clears the token and ends the session securely.

### 🔁 Forgot & Reset Password
- Users can request a password reset via email.
- A secure token is generated, hashed, and stored with an expiry.
- Password reset validates:
  - Token authenticity and expiry
  - Password and confirmPassword match
- On success, the password is updated and the reset token is cleared.

### 🛡️ Security & Middleware
- Passwords are hashed using **bcrypt**.
- JWT tokens are signed and verified with a secret key.
- Protected routes use an `isAuthenticated` middleware to verify token and attach user to `req.user`.
- All sensitive flows are validated and rate-limited.
- Centralized error handling ensures clean and consistent responses.

### 🔄 Automation
- A background cron job runs every **30 minutes** to delete unverified accounts.
- Keeps the database clean and prevents stale or spammy registrations.

### 🧠 Smart Design Decisions
- OTPs are stored with expiry and cleared after use.
- Verification attempts are tracked per user.
- All flows are modular and separated across controllers, models, routes, and utilities.
- Built with clarity, maintainability, and production-readiness in mind.

---

## 📦 Tech Stack

| Layer        | Tools Used                          |
|--------------|-------------------------------------|
| Backend      | Node.js, Express                    |
| Database     | MongoDB, Mongoose                   |
| Auth         | JWT, bcrypt                         |
| Email        | Nodemailer                          |
| SMS          | Twilio                              |
| Utilities    | dotenv, cookie-parser, crypto       |

---

## 📁 Folder Structure

├── automation/ 
│ └── removeUnverifiedAccounts.js
├── controllers/ 
│ └── userController.js 
├── database/ 
│ └── dbConnection.js
├── middlewares/ 
│ ├── auth.js
│ ├── atchAsyncError.js 
│ └── error.js
├── models/ 
│ └── userModel.js 
├── routes/ 
│ └── userRouter.js  
├── utils/ 
│ ├── sendEmail.js 
│ └── sendToken.js  
├── app.js
├── config.env 
└── server.js


---

##  API Endpoints

| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| POST   | `/register`                       | Register user with OTP         |
| POST   | `/otp-verification`               | Verify OTP                     |
| POST   | `/login`                          | Login with email & password    |
| GET    | `/logout`                         | Logout and clear session       |
| POST   | `/password/forgot`                | Send reset token via email     |
| PUT    | `/password/reset/:token`          | Reset password with token      |
| GET    | `/me`                             | Get authenticated user profile |

---

✅ To Do / Future Enhancements

-Add Google/Microsoft OAuth login
-Implement rate limiting and IP tracking
