const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // BASIC LOGIN
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  // FACE LOGIN
  faceRegistered: { type: Boolean, default: false },
  faceEmbedding: { type: [Number], default: [] },

  // MULTIPLE WALLETS (ETH + BTC)
  wallets: [
    {
      type: { type: String, required: true }, 
       address: { type: String },  // "ETH" or "BTC"
      cipher: { type: [Number], required: true },
      iv: { type: [Number], required: true },
      label: { type: String, default: "My Wallet" },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  // OTP LOGIN
  otp: { type: String, default: null },
  otpExpires: { type: Number, default: null },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
