import mongoose from 'mongoose';

const publishSchema = new mongoose.Schema({
  title: String,
  genre: String,
  description: String,
  targetAudience: String,
  publishingGoals: String,
  timeline: String,
  budget: String,
  previouslyPublished: Boolean,
  marketingExperience: String,
  manuscriptFile: String
}, {
  timestamps: true
});

export default mongoose.model('Publish', publishSchema);
