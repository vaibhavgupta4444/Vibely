import { Router } from "express";
import { signin, signup, verify } from "../controllers/user-controller";
import asyncWrapper from "../utils/async-wrapper";

const userRouter = Router();


userRouter.post("/signup", asyncWrapper(signup));
userRouter.post("/signin", asyncWrapper(signin));
userRouter.patch("/verify", asyncWrapper(verify));

export default userRouter;