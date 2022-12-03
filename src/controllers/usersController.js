import User from "../model/User.js";
import Note from "../model/Note.js";

import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {

  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

export const createNewUser = async (req, res) => {
  try {
  } catch {}
};

export const updateUser = async (req, res) => {
  try {
  } catch {}
};

export const deleteUser = async (req, res) => {
  try {
  } catch {}
};
