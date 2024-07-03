import express from "express";
import { createMessage } from "../controllers/createMessage.js";

export const messageRoute = express.Router();

messageRoute.route("/").post(createMessage);
