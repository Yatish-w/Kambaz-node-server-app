//import db from "../Database/index.js";
import model from "./model.js";
import mongoose from "mongoose";
//let { users } = db;

// Helper to generate a unique ID
const generateUniqueId = () => new mongoose.Types.ObjectId().toString();

export const createUser = async (user) => {
    try {
        // If no _id provided, generate one
        if (!user._id) {
            user._id = generateUniqueId();
        }
        console.log("Creating user with data:", {
            username: user.username,
            role: user.role,
            _id: user._id
        });
        
        // Handle potential validation issues before creating
        if (!user.username || !user.password) {
            throw new Error("Username and password are required");
        }
        
        return await model.create(user);
    } catch (error) {
        console.error("Error in createUser:", error.message);
        // If it's a duplicate key error (username already exists)
        if (error.code === 11000) {
            throw new Error("Username already exists");
        }
        throw error; // Re-throw for the caller to handle
    }
};

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};