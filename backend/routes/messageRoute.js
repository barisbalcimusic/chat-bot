import express from "express";
import { createMessage } from "../controllers/createMessage.js";
import { getAllMessages } from "../controllers/getAllMessages.js";

export const messageRoute = express.Router();

messageRoute.route("/").get(getAllMessages).post(createMessage);
