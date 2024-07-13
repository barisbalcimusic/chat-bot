import express from "express";
import { createUser } from "../controllers/user/createUser.js";

export const userRoute = express.Router();

//CREATE USER
userRoute.route("/").post(createUser);
