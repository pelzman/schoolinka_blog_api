import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./config";
import { HttpError } from "http-errors";
import cors from "cors";
import logger from "morgan";
import config from "./config/dbconfig";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes";
import BlogRoutes from "./routes/blogRoutes";
import path from "path";

const app = express();
const { PORT } = config;
dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

db.sync({})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });
app.use("/users", UserRoutes);
app.use("/blogs", BlogRoutes);
const BUILDPORT = PORT;

app.listen(BUILDPORT, () => {
  console.log(`server running on port ${BUILDPORT}`);
});

export default app;
