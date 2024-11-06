const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");

// const express = require("express");
// const cors = require("cors");
// const app = express();

app.use(
  cors({
    origin: "https://login-mern-app-6kqa-uis.vercel.app",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already exit ,you can login",
        successs: false,
      });
    }
    const usermodel = new UserModel({
      name,
      email,
      password,
    });

    usermodel.password = await bcrypt.hash(password, 10);
    await usermodel.save();
    res.status(201).json({
      message: "Signup successfully..",
      successs: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error...",
      successs: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMessage = "auth faled eamil or password is wrong...";
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        successs: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({
        message: errorMessage,
        successs: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "login successfully..",
      successs: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error...",
      successs: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
