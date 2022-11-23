import { Router } from "express";
import Transaction from "../models/transaction.js";
import passport from "passport";
const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction });
});

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });

  await transaction.save();
  res.json({ message: "transaction" });
});

router.patch("/:id", async (req, res) => {
  const result = await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  console.log("Update");
  console.log(result);
  res.json({ message: "Success" });
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  await Transaction.findOneAndDelete({ _id });
  console.log(`Hapus ${_id}`);

  res.json({ message: "success" });
});

export default router;
