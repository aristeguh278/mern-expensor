import { Router } from "express";
import passport from "passport";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();
import dotenv from "dotenv";
dotenv.config();

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
