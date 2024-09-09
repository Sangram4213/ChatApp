import generateTokenAndSetCookie from "../../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const logInUser = async (req, res) => {
  
};

export const signUpUser = async(req, res) => {
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
        const hashPassword = await bcrypt.hash(password,salt);
    
        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        // Generate JWT token here
    
        const newUser = await User.create({
          fullName,
          userName,
          password:hashPassword,
          gender,
          profilePic: gender === "male" ? boyProfile : girlProfile,
        });

        generateTokenAndSetCookie(newUser._id,res);
    
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

export const logOutUser = (req, res) => {
  console.log("LogOut");
};
