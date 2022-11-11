import mongoose from "mongoose";
import { mongo_uri } from "../resources/uri.js";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectWithDB =  () => {
    mongoose.connect(mongo_uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log(` database connection`)
    })
}

export default connectWithDB;