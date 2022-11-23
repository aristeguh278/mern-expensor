import express from "express";
import cors from "cors";
import connectWithDB from "./database/mongodb.js";
import TransactionRoutes from "./routes/transactions.js";
import AuthApi from "./routes/AuthApi.js";
import UserApi from "./routes/UserApi.js";
import passport from "passport";
import passpotConfig from "./config/passport.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passpotConfig(passport);

app.get("/", (req, res) => {
  console.log("server is running");
  res.send("Hello world");
});

app.use("/transaction", TransactionRoutes);
app.use("/auth", AuthApi);
app.use("/user", UserApi);

connectWithDB();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
