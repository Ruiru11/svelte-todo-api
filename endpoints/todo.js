const express = require("express");
import passport from "passport";

import {
  CreateTodo,
  GetTodo,
  GetSingleTodo,
  DeleteTodoItem,
  UpdateTodoItem,
  EditTodoItem,
  GetMetrics,
} from "../utils/todo";

const route = express.Router();

route.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  CreateTodo
);
route.get("/todos", passport.authenticate("jwt", { session: false }), GetTodo);
route.get(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  GetSingleTodo
);
route.delete(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  DeleteTodoItem
);
route.put(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  UpdateTodoItem
);
route.put(
  "/todo/edit/:id",
  passport.authenticate("jwt", { session: false }),
  EditTodoItem
);
route.get(
  "/todos/stats",
  passport.authenticate("jwt", { session: false }),
  GetMetrics
);

module.exports = route;
