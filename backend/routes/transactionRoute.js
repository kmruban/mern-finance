import express from "express";
import expressAsyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";
import { isAuth } from "../utils.js";

const router = express.Router();

router.post(
  "/add-transaction",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newTransaction = new Transaction({
        type: req.body.type,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        user: req.user._id,
      });

      const trans = await newTransaction.save();
      res.status(201).send({ message: "New Transaction Created", trans });
    } catch (error) {
      console.log(error);
    }
  })
);

router.get(
  "/my-transactions",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const transaction = await Transaction.find({ user: req.user._id });
      res.send(transaction);
    } catch (error) {
      console.log(error);
    }
  })
);

export default router;
