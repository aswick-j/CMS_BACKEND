import User from "../model/User.js";
import Task from "../model/Task.js";

import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate Username Found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { username, password: hashedPassword, roles };

    const user = await User.create(userObject);

    if (user) {
      return res.status(401).json({ message: `New user ${username} Created` });
    } else {
      return res.status(400).json({ message: "Something Went wrong" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, username, active, password, roles } = req.body;

    if (
      !id ||
      !username ||
      !Array.isArray(roles) ||
      !roles.length ||
      typeof active !== "boolean"
    ) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(407).json({ message: "Duplicate username Found" });
    }

    user.username = username;
    user.active = active;
    user.roles = roles;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updateUser = await user.save();

    if (updateUser) {
      return res.status(207).json({ message: "Updated Successfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is Required" });
    }

    const task = Task.findOne({ user: id }).lean().exec();

    if (task?.length) {
      return res.status(200).json({ message: "User has Assigned Tasks" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    const deleteUser = await user.deleteOne();

    res.status(200).json({message: `Username ${deleteUser.username} with ID ${deleteUser._id} deleted`})

  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
