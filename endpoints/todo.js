const express = require("express");
import { CreateTodo } from "../utils/todo";

const route = express.Router();

route.post("/todo", CreateTodo);

module.exports = route;
