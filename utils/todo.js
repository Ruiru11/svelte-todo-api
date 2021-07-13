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
    duration:req.body.duration,
    User:req.user._id
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
  const id = req.user._id;
  getTodo(id)
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
  const _id = req.user._id;
  getMetrics(_id)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(err.status).json({message:err.message})
    next(err)
  })
}
