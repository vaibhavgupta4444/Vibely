import { Router } from "express";
import { signup } from "../controllers/user-controller";
import asyncWrapper from "../utils/async-wrapper";

const userRouter = Router();


userRouter.post("/signup", asyncWrapper(signup));

export default userRouter;