import express from "express";
import dotenv from "dotenv";
import connectDb from "./databases/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDb();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Task Home Page");
});

app.listen(port, () => {
  console.log(`Server Starts at ${port}`);
});

