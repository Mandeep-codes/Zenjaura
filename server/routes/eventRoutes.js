import express from 'express';
import { getEvents, registerEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/:id/register', registerEvent);

export default router;

