const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://kyleruban:kmruban@cluster0.wyf8d.mongodb.net/sheymoney-udemy",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
 
const connection = mongoose.connection;

//on error
connection.on('error', err => console.log(err));

//on success
connection.on('connected' , () => console.log('Mongo DB Connection Successful'));