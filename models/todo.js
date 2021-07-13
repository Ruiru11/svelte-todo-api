const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoItemsSchema = new Schema({
  task: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoItemsSchema);
