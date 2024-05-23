import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            phone: req.body.phone,
            email: req.body.email,
            password: hashPassword
        });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        if (req.body.email !== user.email) {
            return res.status(400).json({ error: "Invalid email" });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        return res.status(401).json({ message: 'Invalid token' });
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

// Update a subscribed user by ID
const updateUser = async (req, res) => {
  try {
    const {fname, lname, phone, email, is_admin } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Subscribed user not found' });
    }
    user.fname = fname;
    user.lname = lname;
    user.phone = phone;
    user.email = email;
    user.is_admin = is_admin;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      res.status(400).json({ error: 'Email already subscribed' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Delete a subscribed user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: ' user not found' });
    }
    res.status(200).json({ message: ' user deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, getUser, getAllUsers, deleteUser, getUserById,updateUser };
