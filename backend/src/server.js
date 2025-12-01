import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';

// Load env vars
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Static folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 SLMA Platform API is running...',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      members: '/api/members',
      events: '/api/events',
      projects: '/api/projects',
      admin: '/api/admin',
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// Error handler middleware (should be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});