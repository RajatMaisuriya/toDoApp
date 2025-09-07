const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/todoApp")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

mongoose.connection
  .once("open", () => console.log("Connected to MongoDB!"))
  .on("error", (err) => console.error("MongoDB Connection Error", err));

// Todo Schema
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes

// GET all todos
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
  console.log(todos);
});

// POST a new todo
app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.put("/api/todos/:id", async (req, res) => {
  const updateTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      task: req.body.task,
      completed: req.body.completed,
    },
    { new: true }
  );
  res.json(updateTodo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted SuccessFully..." });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
