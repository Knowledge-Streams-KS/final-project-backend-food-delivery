import { Router } from "express";
import authController from "../../controller/userController/userController.js";
import userAuthMiddleWare from "../../middleware/index.js";
const authRouter = Router();

authRouter.post("/signUp", userAuthMiddleWare, authController.signUp);
authRouter.post("/LogIn", authController.LogIn);

export default authRouter;
