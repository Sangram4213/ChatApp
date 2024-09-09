import generateTokenAndSetCookie from "../../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUpUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Password don't match",
      });
    }

    const user = await User.findOne({ userName });

    if (user)
      return res.status(400).json({
        error: "Username already exist",
      });

    //Hash Password Here
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // Generate JWT token here

    const newUser = await User.create({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by userName
    const user = await User.findOne({ userName });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(400).json({
        error: "User or Password is Incorrect!",
      });
    }

    // Compare the input password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "User or Password is Incorrect!",
      });
    }

    // Generate token and set cookie (assuming you have this function)
    generateTokenAndSetCookie(user._id, res);

    // Respond with the user details
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logOutUser = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully!"})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
