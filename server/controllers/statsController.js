import Stat from '../models/Stats.js';

export const getStatsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const stats = await Stat.findOne({ authorId });
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const updateStats = async (req, res) => {
  try {
    const { authorId } = req.params;
    const updated = await Stat.findOneAndUpdate({ authorId }, req.body, {
      new: true,
      upsert: true
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stats' });
  }
};
