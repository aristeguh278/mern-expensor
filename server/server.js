import express from "express";
import cors from "cors";
import connectWithDB from "./database/mongodb.js";
import TransactionRoutes from './routes/transactions.js'

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json())


app.get("/",(req,res)=>{
  console.log('server is running')
  res.send("Hello world")
})

app.use("/transaction",TransactionRoutes)

connectWithDB()

app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})

