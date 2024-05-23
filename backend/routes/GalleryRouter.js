import express from 'express';
import { createGallery, getGalleries, getGalleryById,
     updateGallery, deleteGallery } from '../controllers/GalleryController.js';
const router = express.Router();

// Define route handlers
router.post('/', createGallery);
router.get('/', getGalleries);
router.get('/:id', getGalleryById);
router.put('/:id', updateGallery);
router.delete('/:id', deleteGallery);


export default router;
  