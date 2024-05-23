
import ContactUs from '../models/contactUs.js';
// Create a new Message
const createMessage = async (req, res) => {
  try {
    const { name, email , message } = req.body;
    const newMessage = new ContactUs({ name, email, message });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  
};
// Get all Message
const getMessages = async (req, res) => {
  try {
    const message = await ContactUs.find();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Message  by ID
const getMessageById= async (req, res) => {
  try {
    const message = await ContactUs.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a Message by ID
const deleteMessage = async (req, res) => {
  try {
    const message = await ContactUs.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'message  not found' });
    }
    res.status(200).json({ message: 'message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createMessage, getMessages, getMessageById, deleteMessage };
