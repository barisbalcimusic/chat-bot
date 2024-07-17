import express from "express";
import { connectDB } from "./utils/connectDB.js";
import { messageRoute } from "./routes/messageRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import { questionsRoute } from "./routes/questionsRoute.js";
import { userRoute } from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());

//CORS ip settings
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://chatbotbybaris.netlify.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//NECCESSARY TO READ COOKIES FROM REQUEST OBJECT
app.use(cookieParser());

//CONNECT TO DB
const db_url = process.env.MONGO_URI;
await connectDB(db_url);

//ROUTES
app.use("/api/users", userRoute);
app.use("/api/conversations", messageRoute);
app.use("/api/gpt", questionsRoute);

//ERROR HANDLER
app.use(errorMiddleware);

//START SERVER
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
