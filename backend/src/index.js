import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// IMPORTANT: Enable trust proxy for correct HTTPS detection behind proxies like Render
app.set('trust proxy', 1);

// CORS middleware configuration to allow requests from your frontend and send cookies
app.use(cors({
  origin: 'https://linkednest-nu.vercel.app',  // Your frontend URL
  credentials: true,
}));

// JSON request body parser middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Start server and connect to database
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
