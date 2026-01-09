import { Router } from "express";
import { signin, signup, verify } from "../controllers/user-controllers/user-controller-auth";
import { refreshToken } from "../controllers/user-controllers/user-controller-token";
import { changePassword, forgotPassword, generateResetToken } from "../controllers/user-controllers/user-controller-password";
import asyncWrapper from "../utils/async-wrapper";
import authUser from "../middlewares/auth";

const userRouter = Router();


userRouter.post("/signup", asyncWrapper(signup));
userRouter.post("/signin", asyncWrapper(signin));
userRouter.patch("/verify", asyncWrapper(verify));
userRouter.post('/reset-password', authUser, asyncWrapper(changePassword));
userRouter.post('/refresh-token', authUser, asyncWrapper(refreshToken));

// forgot password routes
userRouter.post('/forgot-password', asyncWrapper(generateResetToken));
userRouter.patch('/forgot-password/:token', asyncWrapper(forgotPassword));

export default userRouter;