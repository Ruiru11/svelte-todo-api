const {
  createTodo,
  getTodo,
  getAsingleTodo,
  deleteTodoItem,
  updateTodoItem,
  editTodoItem,
  getMetrics
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
        res.status(err.status).json({ message: "Todo item already exists" });
      } else {
        res.status(err.status).json({ message: err.message });
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
      res.status(err.status).json({ message: err.message });
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
      res.status(err.status).json({ message: err.message });
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
      res.status(err.status).json({ message: err.message });
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
      res.status(err.status).json({ message: err.message });
      next(err);
    });
};


export const EditTodoItem = (req,res,next) => {
  const id = req.params.id
  editTodoItem(id,req.body)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(err.status).json({ message: err.message });
      next(err);
  })
}


export const GetMetrics = (req,res,next) => {
  getMetrics()
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(err.status).json({message:err.message})
  })
}
