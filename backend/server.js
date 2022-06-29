const express = require("express");
const dbConnect = require("./dbConnect");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

const userRoute = require("./routes/usersRoute");
app.use("/api/users/", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node JS Server started at port ${port}!`));
