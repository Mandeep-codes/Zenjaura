import express from 'express';
import {
  registerAuthor,
  loginAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/register', registerAuthor);
router.post('/login', loginAuthor);

// Author profile routes
router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
