import express from "express";
import { createUser } from "../controllers/user/createUser.js";
import { getUser } from "../controllers/user/getUser.js";

export const userRoute = express.Router();

//CREATE USER
userRoute.route("/register").post(createUser);
//GET USER
userRoute.route("/login").post(getUser);
