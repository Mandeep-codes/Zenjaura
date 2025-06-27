import Publish from '../models/publishModel.js';

export const submitApplication = async (req, res) => {
  try {
    const {
      title,
      genre,
      description,
      targetAudience,
      publishingGoals,
      timeline,
      budget,
      previouslyPublished,
      marketingExperience,
    } = req.body;

    const manuscriptFile = req.file ? req.file.filename : null;

    const newPublish = new Publish({
      title,
      genre,
      description,
      targetAudience,
      publishingGoals,
      timeline,
      budget,
      previouslyPublished,
      marketingExperience,
      manuscriptFile
    });

    await newPublish.save();

    res.status(201).json({ message: 'Publish form submitted', data: newPublish });
  } catch (err) {
    console.error('Error submitting publish form:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
