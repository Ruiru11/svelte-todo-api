const {
  createTodo,
  getTodo,
  getAsingleTodo,
  deleteTodoItem,
  updateTodoItem,
} = require("../api/todo");



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

export const GetTodo = (req, res, next) => {
  getTodo()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(400).json({ message: err.message });
      next(err);
    });
};

export const GetSingleTodo = (req, res, next) => {
  const id = req.params.id;
  getAsingleTodo(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(400).json({ message: err.message });
      next(err);
    });
};

export const DeleteTodoItem = (req, res, next) => {
  const id = req.params.id;
  deleteTodoItem(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
      next(err);
    });
};

export const UpdateTodoItem = (req, res, next) => {
  const id = req.params.id;
  updateTodoItem(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
      next(err);
    });
};
