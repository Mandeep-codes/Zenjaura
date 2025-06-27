import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByBook // ✅ ADD THIS
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/book/:bookId', getReviewsByBook);
router.post('/', createReview);
router.delete('/:id', deleteReview);

export default router;
