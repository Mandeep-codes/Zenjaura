import express from 'express';
import {
  getStatsByAuthor,
  updateStats
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/:authorId', getStatsByAuthor);
router.put('/:authorId', updateStats);

export default router;
