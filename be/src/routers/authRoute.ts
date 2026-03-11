import { Router } from "express";
import { createUser, getMe, loginUser, logoutUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/create', createUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', requireAuth, logoutUser);
authRouter.get('/me', requireAuth, getMe);

export default authRouter