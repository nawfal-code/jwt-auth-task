import bcrypt from "bcrypt";
import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Implement a controller function to handle user registration.
export const userRegistration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    //Hash the user's password before saving it to the database.
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new users({
      username,
      email,
      password: hashPassword,
    });
 await newUser.save();

 //Return a success message upon successful registration.
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "User Registration failed", error });
  }
};


//Implement a controller function to handle user login.
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify the user's credentials.
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const userDetails = await users.findOne({ email });
    if (!userDetails) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const checkPassword = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
//Generate a JWT upon successful login.
    const token = jwt.sign(
      { _id: userDetails._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
//Return the JWT to the user.
    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};

//Implement a controller function to handle the request.(getuser)
//Return the user's information retrieved from the token.

export const getUser = async (req, res) => {
  try {
    // req.user will come from JWT middleware
    return res.status(200).json({
      message: "User information retrieved successfully",
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve user information",
      error,
    });
  }
};
