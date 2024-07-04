import express from "express";
import { getQuestions } from "../controllers/getQuestions.js";

export const questionsRoute = express.Router();

questionsRoute.route("/").get(getQuestions);
