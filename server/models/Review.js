import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewerName: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
  bookTitle: String, // You can later change this to a `bookId` if linking to Book model
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
