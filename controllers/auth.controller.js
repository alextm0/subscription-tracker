import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_EXPIRATION, JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  // Mongoose transaction session (atomic operations)
  const session = await mongoose.startSession();

  // Explanation: A transaction is a set of operations that are executed as a single unit of work.
  // A transaction is atomic, consistent, isolated, and durable (ACID properties).
  // Atomic: All operations in a transaction are executed or none
  session.startTransaction();

  try {
    // Implement the sign up logic here
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // To ensure that the operations are executed as a single unit of work => use the session
    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
    console.log("JWT_EXPIRATION: ", JWT_EXPIRATION, JWT_SECRET);
    const token = jwt.sign({
      userId: newUsers[0]._id,
    }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    await session.commitTransaction(); // Commit the transaction
    await session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUsers[0],
        token
      }
    })
  } catch (error) {
    // Explanation: If an error occurs, the transaction is aborted => no changes are made to the database
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        user,
        token
      }
    })

  } catch(error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {
  // TODO
}