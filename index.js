const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const Todo = require("./endpoints/todo");
import cors from 'cors';
require('dotenv').config()

app.use(cors);
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", function () {
  console.log(chalk.yellow("Connected to mongo server."));
});

app.use("/api/", Todo);

const  PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("connected to server 3000");
});
