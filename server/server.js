import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mongo_uri } from "./resources/uri.js";

const PORT = 4000;
const app = express();
app.use(cors);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectWithDB = () => {
    mongoose.connect(mongo_uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log("database connection")
    })
}

connectWithDB()


