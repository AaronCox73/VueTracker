const express = require("express");
const router = express.Router();
const todoModel = require("../models/Todo");

// get all Todos
router.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one todo
router.get("/:id", getTodo, (req, res) => {
  res.json(res.TODO);
});

// creating a todo
router.post("/", async (req, res) => {
  const todo = new todoModel({
    title: req.body.title,
    taskDetails: req.body.taskDetails,
    dueDate: req.body.dueDate,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating a todo
router.patch("/:id", getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.TODO.title = req.body.title;
  }
  if (req.body.taskDetails != null) {
    res.TODO.taskDetails = req.body.taskDetails;
  }
  try {
    const updatedTodo = await res.TODO.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.TODO.deleteOne();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await todoModel.findById(req.params.id);
    if (todo === null) {
      return res.status(404).json({ message: "Cannot find Todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.TODO = todo;
  next();
}

module.exports = router;
