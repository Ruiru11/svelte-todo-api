import chalk from "chalk";

const { createTodo } = require("../api/todo");

export const CreateTodo = (req, res, next) => {
  const todoData = {
    task: req.body.task,
    description: req.body.description,
  };
  createTodo(todoData)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        res.status(400).json({ message: "Todo item already exists" });
      } else {
        res.status(400).json({ message: err.message });
      }

      next(err);
    });
};
