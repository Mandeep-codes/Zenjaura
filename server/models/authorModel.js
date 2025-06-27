import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  authorType: {
    type: String,
    enum: ['first-time', 'experienced', 'publisher'],
    default: 'first-time'
  },
  subscribeNewsletter: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before save
authorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
authorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Author = mongoose.model('Author', authorSchema);
export default Author;

