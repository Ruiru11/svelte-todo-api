const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const Todo = require("./endpoints/todo");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/svelte", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", function () {
  console.log(chalk.yellow("Connected to mongo server."));
});

app.use("/api/", Todo);

app.listen(3000, () => {
  console.log("connected to server 3000");
});
