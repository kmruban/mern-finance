import express from "express";
import expressAsyncHandler from "express-async-handler";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { isAuth } from "../utils.js";

const router = express.Router();

router.post(
  "/add-income",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newTransaction = new Income({
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        user: req.user._id,
      });

      const transaction = await newTransaction.save();
      res.status(201).send({ message: "New Transaction Created", transaction });
    } catch (error) {
      console.log(error);
    }
  })
);

router.post(
  "/add-expense",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newTransaction = new Expense({
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        user: req.user._id,
      });

      const transaction = await newTransaction.save();
      res.status(201).send({ message: "New Transaction Created", transaction });
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
