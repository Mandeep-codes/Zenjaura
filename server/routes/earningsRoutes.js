import express from 'express';
import {
  getEarningsByAuthor,
  addEarning
} from '../controllers/earningsController.js';

const router = express.Router();

router.get('/author/:authorId', getEarningsByAuthor);
router.post('/', addEarning);

export default router;
