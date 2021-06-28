const mongoose = require("mongoose");

const todoItemsSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model("Todo", todoItemsSchema);

module.exports = todoModel;
