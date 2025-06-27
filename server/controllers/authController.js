import Author from '../models/authorModel.js';

// 🔐 Register Author
export const registerAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, authorType, subscribeNewsletter } = req.body;

    const existingAuthor = await Author.findOne({ email });
    if (existingAuthor) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newAuthor = new Author({
      firstName,
      lastName,
      email,
      password,
      authorType,
      subscribeNewsletter,
      name: `${firstName} ${lastName}` // optional unified name field
    });

    await newAuthor.save();
    res.status(201).json({ message: 'Author registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// 🔐 Login Author
export const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });

    if (!author) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await author.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      author: {
        id: author._id,
        name: author.name,
        email: author.email,
        authorType: author.authorType
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// 👤 Get All Authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().select('-password');
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Fetching authors failed', error: error.message });
  }
};

// 👤 Get Single Author by ID
export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).select('-password');
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch author', error: error.message });
  }
};

// ✏️ Update Author
export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json({ message: 'Author updated', author: updatedAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// ❌ Delete Author
export const deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json({ message: 'Author deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};

