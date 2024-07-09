import express from "express";
import { createMessage } from "../controllers/chat/createMessage.js";
import { getAllMessages } from "../controllers/chat/getAllMessages.js";

export const messageRoute = express.Router();

messageRoute.route("/").get(getAllMessages).post(createMessage);
