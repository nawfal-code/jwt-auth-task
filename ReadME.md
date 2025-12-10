# User Authentication with JWT (Bearer Token)

This is a Node.js authentication system built using Express, MongoDB, Mongoose, bcrypt, and JWT following the MVC architecture.

## Features
- User Registration
- Secure Password Hashing
- User Login with JWT Token
- Bearer Token Authentication
- Protected User Profile Route
- MongoDB Database Connection

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv



## API Endpoints

### Register
POST /api/users/register

### Login
POST /api/users/login

### Get User (Protected)
GET /api/users/me  
Authorization: Bearer <token>

## Author
Mohammed Nawfal
