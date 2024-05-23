import Event from '../models/event.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the upload directory
const uploadDirectory = path.join(__dirname, '..', 'uploads', 'events');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new event entry with multiple images
const createEvent = [
  upload.array('images', 10), // Accept up to 10 images
  async (req, res) => {
    try {
      const { title, description, date, is_posted } = req.body;
      const imageUrls = req.files.map(file => `/uploads/events/${file.filename}`);

      const event = new Event({ title, description,date,is_posted, images: imageUrls });
      await event.save();

      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Get all event entries
const getEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single event entry by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a event entry by ID with multiple images
const updateEvent = [
  upload.array('images', 10),
  async (req, res) => {
    try {
      const { title, description, date, is_posted } = req.body;
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      event.title = title;
      event.description = description;
      event.date = date;
      event.is_posted = is_posted;

      if (req.files.length > 0) {
        const imageUrls = req.files.map(file => `/uploads/events/${file.filename}`);
        event.images = imageUrls;
      }

      await event.save();
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// // Delete a Event entry by ID
// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
   
//     res.status(200).json({ message: 'Event deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export { createEvent, getEvents, getEventById, updateEvent };
