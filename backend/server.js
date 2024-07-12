import express from "express";
import { connectDB } from "./utils/connectDB.js";
import { messageRoute } from "./routes/messageRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import { questionsRoute } from "./routes/questionsRoute.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

//CONNECT TO DB
await connectDB();

//ROUTES
app.use("/api/conversations", messageRoute);
app.use("/api/questions", questionsRoute);

//ERROR HANDLER
app.use(errorMiddleware);

//START SERVER
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
