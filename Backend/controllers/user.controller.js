import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Helper to generate tokens
const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, password, mobileNumber } = req.body;

    if (!fullName || !password || !mobileNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ fullName }, { mobileNumber }],
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ fullName, password, mobileNumber });

    const safeUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { fullName, mobileNumber, password } = req.body;

    if (!(fullName || mobileNumber)) {
      return res.status(400).json({ success: false, message: "Full name or mobile number required" });
    }

    const user = await User.findOne({
      $or: [{ fullName }, { mobileNumber }],
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isValid = await user.isPasswordCorrect(password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login successful",
        data: {
          user: await User.findById(user._id).select("-password -refreshToken"),
          refreshToken,
        },
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { refreshToken: 1 },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Refresh Access Token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token missing" });
    }

    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed successfully",
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
  }
};

// Change Password
export const changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findById(req.user._id);
    const isValid = await user.isPasswordCorrect(oldPassword);

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
