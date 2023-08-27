const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  taskDetails: {
    type: String,
    required: true,
  },
  // todo: string for now but make sure you change it into a date type
  dueDate: {
    type: Date, // Use Date type
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("todoModel", todosSchema);
