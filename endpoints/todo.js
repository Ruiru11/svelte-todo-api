const express = require("express");
import {
  CreateTodo,
  GetTodo,
  GetSingleTodo,
  DeleteTodoItem,
  UpdateTodoItem,
  EditTodoItem
} from "../utils/todo";

const route = express.Router();

route.post("/todo", CreateTodo);
route.get("/todos", GetTodo);
route.get("/todo/:id", GetSingleTodo);
route.delete("/todo/:id", DeleteTodoItem);
route.put("/todo/:id", UpdateTodoItem);
route.put("/todo/edit/:id",EditTodoItem);

module.exports = route;
