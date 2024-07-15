import express from "express";
import { register } from "../controllers/user/createUser.js";
import { login } from "../controllers/user/login.js";
import { logout } from "../controllers/user/logout.js";
import { deleteUser } from "../controllers/user/deleteUser.js";

export const userRoute = express.Router();

//REGISTER
userRoute.route("/register").post(register);
//LOGIN
userRoute.route("/login").post(login);
//LOGOUT
userRoute.route("/logout").post(logout);
//DELETE USER
userRoute.route("/delete").delete(deleteUser);
