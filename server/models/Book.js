import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    enum: ['fiction', 'non-fiction', 'poetry', 'business', 'self-help', 'biography', 'science'],
    required: true
  },
  publishDate: { type: Date, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  cover: { type: String },
  description: { type: String },
  price: { type: String },
  pages: { type: Number },
  publisher: { type: String },
  isbn: { type: String },
  language: { type: String },
  detailedDescription: { type: String }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
