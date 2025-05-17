import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// env config

dotenv.config();

// router imports
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";

// mongodb connection

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/blog", blogRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT} port on ${process.env.DEV_MODE}`);
});
