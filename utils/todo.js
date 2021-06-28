const { createTodo } = require("../api/todo") ;

export const CreateTodo = (req, res, next) => {
    console.log("<><<<<<>>>",req.body)
  const todoData = {
    task: req.body.task,
    description: req.body.description,
  };
  createTodo(todoData)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
      next(err);
    });
};
