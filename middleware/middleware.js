import jwt from "jsonwebtoken";
import users from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

//Create a middleware function to verify the JWT from the request headers.
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

//Decode the token to get the user's information.
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await users.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
//Attach the user's information to the request object.
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
