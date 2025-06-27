import mongoose from 'mongoose';

const earningsSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String, // e.g., "June 2025"
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Earning', earningsSchema);
