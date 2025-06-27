import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['workshop', 'webinar', 'signing', 'conference', 'networking'],
    default: 'workshop'
  },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  instructor: { type: String },
  price: { type: Number, default: 0 },
  capacity: { type: Number, default: 0 },
  registered: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  image: { type: String },
  description: { type: String },
  tags: [String]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
