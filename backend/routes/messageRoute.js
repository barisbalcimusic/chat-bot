import express from "express";
import { getConversation } from "../controllers/message/getConversation.js";
import { createConversation } from "../controllers/message/createConversation.js";
import { createMessage } from "../controllers/message/createMessage.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const messageRoute = express.Router();

//GET CONVERSATION
messageRoute.route("/:id").get(getConversation);
//CREATE CONVERSATION
messageRoute.route("/").post(createConversation);
//CREATE MESSAGES IN CONVERSATION
messageRoute.route("/messages").post(verifyToken, createMessage);
