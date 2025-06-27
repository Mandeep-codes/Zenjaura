import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authorRoutes.js';


// Import Routes
import bookRoutes from './routes/bookRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import publishRoutes from './routes/publishRoute.js'; // ✅ NEW

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/books', bookRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/authors', authRoutes);
app.use('/api/publish', publishRoutes); // ✅ NEW
app.use('/uploads', express.static('uploads'));
// Default route
app.get('/', (req, res) => {
  res.send('Zenjaura API is running...');
});

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

