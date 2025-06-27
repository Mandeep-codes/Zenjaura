import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

// ✅ Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '');
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// ✅ Route: POST /api/publish
router.post('/', upload.single('manuscript'), (req, res) => {
  const formData = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Manuscript file is required.' });
  }

  // (Optional) Save formData to MongoDB
  res.status(200).json({
    message: 'Submission received!',
    data: formData,
    filePath: file.path
  });
});

export default router;


