import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users
export const getAllUsers = async (req, res) => {
  console.log(req.headers);
  try {
    const users = await userModel.find(); // Returns plain data
    res.status(200).json({
      message: "all user get",
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// Register users

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        message: "require all fileds",
        success: false,
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(401).send({
        message: "user already available",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).send({
      message: "user created successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while registering the user",
      success: false,
      error,
    });
  }
};

// login users

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        message: "please enter email or password",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "user not available",
        success: false,
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).send({
        message: "Invalid Credintials",
        success: false,
      });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    console.log(token);

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Login Successfull",
      success: true,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error in login",
      success: false,
      error,
    });
  }
};
