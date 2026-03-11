import authRouter from './routers/authRoute.js';
import connectdb from './config/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from "express";
import projectRouter from './routers/projectRouter.js';
import { requireAuth } from './middleware/authMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/p', requireAuth, projectRouter);

connectdb()
  .then(() => {
    app.listen('8000', () => {
      console.log('server running');
    });
  })