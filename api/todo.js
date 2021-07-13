import Todo from "../models/todo";

export async function createTodo(todoData) {
  const newTodo = new Todo(todoData);
  if (newTodo) {
    await newTodo.save();
    return newTodo;
  } else {
    throw {
      status: 400,
      message: "Error during event",
    };
  }
}

export async function getTodo(_id) {
  const todos = await Todo.find({ User: _id }).populate("User", [
    "username",
    "email",
  ]);
  if (todos.length === 0) {
    throw {
      status: 200,
      message: "No todo items available",
    };
  } else {
    return todos;
  }
}

export async function getAsingleTodo(id) {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw {
      status: 200,
      message: "Todo item does not exist ",
    };
  } else {
    return todo;
  }
}

export async function deleteTodoItem(id) {
  const todo = await Todo.findById(id);
  if (todo) {
    todo.remove();
    return todo;
  } else {
    throw {
      status: 404,
      message: "todo not found",
    };
  }
}

export async function updateTodoItem(id) {
  const todo = await Todo.findById(id);
  if (todo) {
    todo.completed = !todo.completed;
    todo.save();
    return todo;
  } else {
    throw {
      status: 404,
      message: "todo item not found",
    };
  }
}

export async function editTodoItem(id, params) {
  const todo = await Todo.findById(id);
  if (todo) {
    todo.task = params.task;
    todo.description = params.description;
    todo.save();
    return todo;
  } else {
    throw {
      status: 404,
      message: "todo item not found",
    };
  }
}

export async function getMetrics(_id) {
  const todos = await Todo.find({ author: _id });
  if (todos.length === 0) {
    throw {
      status: 200,
      message: "No todo item stats",
    };
  } else {
    const completedTodo = todos.filter((todo) => todo.completed === true);
    const pendingTodo = todos.filter((todo) => todo.completed === false);

    return { done: completedTodo.length, pending: pendingTodo.length };
  }
}
