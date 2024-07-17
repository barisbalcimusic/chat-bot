import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAnswerFromGPT } from "../controllers/message/getAnswerFromGPT.js";

export const questionsRoute = express.Router();

questionsRoute.route("/").post(verifyToken, getAnswerFromGPT);
