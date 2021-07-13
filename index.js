const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const passport = require("passport");
const Todo = require("./endpoints/todo");
const Users =  require("./api/users");
require('dotenv').config()

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

app.use(passport.initialize())
require("./utils/passport")(passport)

app.use("/api/", Todo);
app.use("/api/auth", Users);


app.listen(3000, () => {
  console.log("connected to server 3000");
});
