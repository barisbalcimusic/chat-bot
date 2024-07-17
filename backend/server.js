import express from "express";
import { connectDB } from "./utils/connectDB.js";
import { messageRoute } from "./routes/messageRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import { questionsRoute } from "./routes/questionsRoute.js";
import { userRoute } from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();
//NECCESSARY TO READ COOKIES FROM REQUEST OBJECT
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//CONNECT TO DB
await connectDB();

//ROUTES
app.use("/api/conversations", messageRoute);
app.use("/api/gpt", questionsRoute);
app.use("/api/users", userRoute);

//ERROR HANDLER
app.use(errorMiddleware);

//START SERVER
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
