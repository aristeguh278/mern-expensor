import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();
import dotenv from "dotenv";
dotenv.config();

router.post("/register", async (req, res) => {
  //get all data from client
  //check if email exist
  //hash password
  //store new user

  //get data
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  //check if user exist with this email
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(406).json({ message: "User already exists" });
    return;
  }

  //hash password
  console.log(password);
  const saltRounded = 10;
  const salt = await bcrypt.genSalt(saltRounded);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({ firstName, lastName, email, password: hashedPassword });
  await user.save();

  return res.status(201).json({ message: "user is created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(406).json({ message: "Credentials not found" });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    console.log("sdfsfsdf");
    res.status(406).json({ message: "Credentials not found" });
    return;
  }

  //create jwt token
  const payload = {
    email,
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  console.log(token);
  res.json({ message: "Successfully login", token, user });
});

export default router;
