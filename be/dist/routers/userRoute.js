import { Router } from "express";
import { createUser } from "../controllers/userController.js";
const userRouter = Router();
userRouter.post('/create', createUser);
export default userRouter;
//# sourceMappingURL=userRoute.js.map