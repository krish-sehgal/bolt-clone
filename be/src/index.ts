import dotenv from 'dotenv';
import express from "express";
import cors from 'cors'
import connectdb from './config/db.js';
import authRouter from './routers/authRoute.js';
import projectRouter from './routers/projectRouter.js';
import { requireAuth } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/p', requireAuth, projectRouter);

connectdb()
  .then(() => {
    app.listen('8000', () => {
      console.log('server running');
    });
  })