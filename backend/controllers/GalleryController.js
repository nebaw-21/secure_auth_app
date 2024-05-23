// controllers/galleryController.js

import Gallery from "../models/gallery.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the upload directory
const uploadDirectory = path.join(__dirname, '..', 'uploads', 'gallery');

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

// Create a new gallery entry with multiple images
const createGallery = [
  upload.array('images', 10), // Accept up to 10 images
  async (req, res) => {
    try {
      const { description } = req.body;
      const imageUrls = req.files.map(file => `/uploads/gallery/${file.filename}`);

      const gallery = new Gallery({ description, images: imageUrls });
      await gallery.save();

      res.status(201).json(gallery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Get all gallery entries
const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single gallery entry by ID
const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a gallery entry by ID with multiple images
const updateGallery = [
  upload.array('images', 10),
  async (req, res) => {
    try {
      const { description } = req.body;
      const gallery = await Gallery.findById(req.params.id);

      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }

      gallery.description = description;

      if (req.files.length > 0) {
        const imageUrls = req.files.map(file => `/uploads/gallery/${file.filename}`);
        gallery.images = imageUrls;
      }

      await gallery.save();
      res.status(200).json(gallery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Delete a gallery entry by ID
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    res.status(200).json({ message: 'Gallery deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createGallery, getGalleries, getGalleryById, updateGallery, deleteGallery };
