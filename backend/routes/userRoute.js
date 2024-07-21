import express from "express";
import { register } from "../controllers/user/createUser.js";
import { login } from "../controllers/user/login.js";
import { logout } from "../controllers/user/logout.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { captcha } from "../utils/captcha.js";
import { verifyUser } from "../controllers/user/verifyUser.js";

export const userRoute = express.Router();

//REGISTER
userRoute.route("/register").post(captcha, register);
//LOGIN
userRoute.route("/login").post(login);
//LOGOUT
userRoute.route("/logout").post(logout);
//UPDATE USER
userRoute.route("/update").patch(verifyToken, updateUser);
//DELETE USER
userRoute.route("/delete").delete(verifyToken, deleteUser);
//VERIFY USER
userRoute.route("/verify/:id").patch(verifyUser);
