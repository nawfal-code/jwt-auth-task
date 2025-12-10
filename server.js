import express from "express";
import dotenv from "dotenv";
import connectDb from "./databases/dbConfig.js";
import Userrouter from "./views/userViews.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDb();

const app = express();

app.use(express.json());

app.use("/api/users", Userrouter);

app.get("/", (req, res) => {
  res.send("Welcome to Task Home Page");
});

app.listen(port, () => {
  console.log(`Server Starts at ${port}`);
});
