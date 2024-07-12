import express from "express";
import { getQuestions } from "../controllers/message/getQuestions.js";

export const questionsRoute = express.Router();

questionsRoute.route("/").get(getQuestions);
