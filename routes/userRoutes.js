import express from "express";
import {
  getUser,
  userLogin,
  userRegistration,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

// Public Routes
//Create a route for user registration.
router.post("/register", userRegistration);

//Create a route for user login.
router.post("/login", userLogin);

//Create a route to get user information.
// Use the token verification middleware to protect this route
router.get("/getdata", authMiddleware, getUser);

export default router;

