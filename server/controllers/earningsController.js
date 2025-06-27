import Earning from '../models/Earnings.js';

export const getEarningsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const earnings = await Earning.find({ authorId }).populate('bookId');
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch earnings' });
  }
};

export const addEarning = async (req, res) => {
  try {
    const newEarning = new Earning(req.body);
    await newEarning.save();
    res.status(201).json(newEarning);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add earning' });
  }
};
