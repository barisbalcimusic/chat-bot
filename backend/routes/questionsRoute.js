import express from "express";
import { getQuestions } from "../controllers/message/getQuestions.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const questionsRoute = express.Router();

questionsRoute.route("/").get(verifyToken, getQuestions);
