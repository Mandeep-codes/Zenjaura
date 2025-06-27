import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { reviewerName, rating, comment, book } = req.body;

    const newReview = new Review({ reviewerName, rating, comment, book });
    await newReview.save();

    res.status(201).json({ message: 'Review created', review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('book', 'title');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ message: 'Review updated', review: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all reviews for a specific book
export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

