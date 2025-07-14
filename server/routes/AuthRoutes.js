import { Router } from "express";
import { signup,login,getUserInfo,updateProfile,addProfileImage,removeProfileImage } from "../controllers/AuthController.js";
// import { authenticate } from "../middlewares/AuthMiddlewares.js";
import { requireAuth } from "../middlewares/AuthMiddlewares.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles'); // ✅ ensure folder exists or created in controller
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const authRoutes=Router();
authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/userInfo",requireAuth,getUserInfo);
authRoutes.post("/update-profile",requireAuth,updateProfile);
authRoutes.post('/add-profile-image', upload.single('profile-image'), requireAuth, addProfileImage);
authRoutes.delete("/remove-profile-image",requireAuth,removeProfileImage);
export default authRoutes;
