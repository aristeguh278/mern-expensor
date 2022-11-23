import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithDB = () => {
  mongoose.connect(process.env.MONGO_URI, options, (err, db) => {
    if (err) console.error(err);
    else console.log(` database connection`);
  });
};

export default connectWithDB;
