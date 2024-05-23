// controllers/blogController.js
import Blog from '../models/blog.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the upload directory
const uploadDirectory = path.join(__dirname, '..', 'uploads', 'blogs');

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

// Create a new blog entry with multiple images
const createBlog = [
  upload.array('images', 10), // Accept up to 10 images
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const imageUrls = req.files.map(file => `/uploads/blogs/${file.filename}`);

      const blog = new Blog({ title, description, images: imageUrls });
      await blog.save();

      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Get all blog entries
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single blog entry by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog entry by ID with multiple images
const updateBlog = [
  upload.array('images', 10),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      blog.title = title;
      blog.description = description;

      if (req.files.length > 0) {
        const imageUrls = req.files.map(file => `/uploads/blogs/${file.filename}`);
        blog.images = imageUrls;
      }

      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Delete a blog entry by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

   
    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
