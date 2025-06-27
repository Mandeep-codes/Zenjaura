import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  booksPublished: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  reviewsReceived: {
    type: Number,
    default: 0
  },
  eventsParticipated: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Stat', statsSchema);
