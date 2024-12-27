import mongoose from "mongoose";
import jwt from "jsonwebtoken"; // Import jwt here

const UserSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    verificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    // OTP Fields
    otp: { type: String }, // OTP for login
    otpExpires: { type: Date }, // OTP expiration time
    failedAttempts: { type: Number, default: 0 },  // Track failed login attempts
    lockoutUntil: { type: Date },  // Lockout expiration time
  },
  { timestamps: true }
);

// Method to generate auth token (JWT)
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

// Create and export the User model
const User = mongoose.model("User", UserSchema);

export default User;
