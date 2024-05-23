// controllers/registerForEventController.js
import RegisterForEvent from '../models/registerForEvent.js';
import Event from '../models/event.js';
import User from '../models/user.js';

// Create a new registration for an event
const createRegistration = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;

    const newRegistration = new RegisterForEvent({ user_id, event_id });
    await newRegistration.save();

    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display all users registered for a specific event
const getUsersByEventId = async (req, res) => {
  try {
    const { event_id } = req.params;

    const registrations = await RegisterForEvent.find({ event_id }).populate('user_id');
    const users = registrations.map(registration => registration.user_id);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createRegistration, getEvents, getUsersByEventId };
