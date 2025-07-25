
import { Router } from "express";
import { SearchContacts } from "../controllers/ContactController.js";
import { requireAuth } from "../middlewares/AuthMiddlewares.js";
const ContactRoutes =Router();

ContactRoutes.post("/search",requireAuth,SearchContacts);

export default ContactRoutes;