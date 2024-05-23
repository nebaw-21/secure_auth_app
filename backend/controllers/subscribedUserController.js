// controllers/subscribedUserController.js
import SubscribedUser from '../models/subscribedUser.js';

// Create a new subscribed user
const createSubscribedUser = async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = new SubscribedUser({ email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      res.status(400).json({ error: 'Email already subscribed' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Get all subscribed users
const getSubscribedUsers = async (req, res) => {
  try {
    const users = await SubscribedUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single subscribed user by ID
const getSubscribedUserById = async (req, res) => {
  try {
    const user = await SubscribedUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Subscribed user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subscribed user by ID
const updateSubscribedUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await SubscribedUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Subscribed user not found' });
    }

    user.email = email;
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
const deleteSubscribedUser = async (req, res) => {
  try {
    const user = await SubscribedUser.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Subscribed user not found' });
    }
    res.status(200).json({ message: 'Subscribed user deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createSubscribedUser, getSubscribedUsers, getSubscribedUserById, updateSubscribedUser, deleteSubscribedUser };
