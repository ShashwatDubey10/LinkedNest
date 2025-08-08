import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);
app.use(cors({
  origin: 'https://linkednest-nu.vercel.app',
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
