// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password, fullName, birthdate, hobbies } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      birthdate,
      hobbies,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        username: newUser.username,
        fullName: newUser.fullName,
        birthdate: newUser.birthdate,
        hobbies: newUser.hobbies,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: { username: user.username, fullName: user.fullName },
      result: "login successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getSelf = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile data", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
