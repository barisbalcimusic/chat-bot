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

//NECCESSARY TO READ COOKIES FROM REQUEST OBJECT
app.use(cookieParser());

app.use(express.json());

//CORS ip settings
app.use(
  cors({
    origin: [
      "https://chatbotbybaris.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

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
