import express from 'express';
import "./dbConnect.js";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/usersRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node JS Server started at port ${port}!`));
