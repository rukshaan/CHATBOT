import { Router } from "express";
import { signup,login,getUserInfo } from "../controllers/AuthController.js";

import { requireAuth } from "../middlewares/AuthMiddlewares.js";


const authRoutes=Router();
authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/userInfo",requireAuth,getUserInfo);

export default authRoutes;
