import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
    console.log("Creating a user");
  
    let { email, role } = req.body;
  
    // Convert email to lowercase for case-insensitive handling
    const lowerCaseEmail = email.toLowerCase();
  
    // Check if the user already exists
    const userExists = await prisma.user.findUnique({ where: { email: lowerCaseEmail } });
    if (!userExists) {
      // If role isn't provided, default to USER
      const resolvedRole = role || "USER";
  
      // Create a new user
      const user = await prisma.user.create({
        data: {
          ...req.body,
          email: lowerCaseEmail,
          role: resolvedRole,
        },
      });
  
      res.status(201).send({
        message: "New User Registered",
        user,
      });
    } else {
      res.status(409).json({ message: "User Already Exists" });
    }
  });
  
  

// Log in a user
export const loginUser = asyncHandler(async (req, res) => {
  console.log("Logging in user");
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: lowerCaseEmail } });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Compare the plain-text password
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // For demonstration, just return success
  res.status(200).json({ message: "Login successful", user });
});

// Log out user
export const logoutUser = asyncHandler(async (req, res) => {
  // For a real-world setup with sessions or JWTs, you would
  // clear the session/cookie or invalidate the token.
  // Here, we simply return a success message.
  console.log("Logging out user");
  return res.status(200).json({ message: "Logout successful" });
});

// Get user by ID (example for demonstration)
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
});