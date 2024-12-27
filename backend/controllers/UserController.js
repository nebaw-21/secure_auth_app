import User from '../models/user.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import logAdminAction from "../utils/logAdminAction.js";


dotenv.config();

const registerUser = async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Save new user
        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            phone: req.body.phone,
            email: req.body.email,
            password: hashPassword,
            verificationToken,
        });

        await newUser.save();

        // Set up email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the link: 
                   ${process.env.APP_URL}/api/verify/verify-email/${newUser._id}/${verificationToken}`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).send('Error sending email');
            }
            res.status(200).json({ message: "User registered successfully! Please check your email to verify your account." });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Define constants for lockout policy
const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Login User with OTP
const loginUserWithOTP = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the account is locked
    if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
      const lockoutRemaining = Math.ceil((user.lockoutUntil - Date.now()) / 1000);
      return res.status(403).json({ message: `Account locked. Try again in ${lockoutRemaining} seconds.` });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Increment failed attempts and lock the account if necessary
      user.failedAttempts += 1;

      if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        user.lockoutUntil = Date.now() + LOCKOUT_TIME;  // Lock account for 15 minutes
      }

      await user.save();
      return res.status(401).json({ message: "Invalid password" });
    }

    // Reset failed attempts and lockout status on successful login
    user.failedAttempts = 0;
    user.lockoutUntil = null;
    await user.save();

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    // Return success response with message
    res.status(200).json({ message: "OTP sent to your email." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP and log the user in
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Generate JWT token on successful login
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Reset failed login attempts and lockout status upon successful OTP verification
    user.failedAttempts = 0;
    user.lockoutUntil = null;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ token, message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






const getUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ensure decoded._id exists and is valid
      if (!decoded || !decoded._id) {
        return res.status(401).json({ message: 'Invalid token payload' });
      }

      const user = await User.findById(decoded._id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ data: user });
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
      } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token' }); // More specific error handling
      }
      console.error("Error in getUser:", error); // Log the error for debugging
      return res.status(500).json({ message: 'Internal server error' }); // Generic error for other issues
  }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single subscribed user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Subscribed user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, phone, email, is_admin } = req.body; // Example fields to update
    
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
  
    user.fname = fname;
    user.lname = lname;
    user.phone = phone;
    user.email = email;
    user.is_admin = is_admin;
    await user.save();

        // Log the admin action
        await logAdminAction(user._id, 'update', user._id, `Updated fields: ${JSON.stringify(req.body)}`);

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    //const adminId = req.user.id; // Assuming admin info is in req.user

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await User.findByIdAndDelete(id);

        // Log the admin action
        await logAdminAction(user._id, 'delete', user._id, `Deleted user with ID: ${id}`);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};


export { registerUser, loginUserWithOTP, getUser, getAllUsers, deleteUser, getUserById, updateUser, verifyOTP };
