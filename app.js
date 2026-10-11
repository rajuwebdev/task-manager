const express = require("express");
const app = express();
const port = 3000;

let tasks = require("./task.json").tasks;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function parseTaskId(value) {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const id = Number(value);

  return Number.isSafeInteger(id) ? id : null;
}

// GET /tasks - Get all tasks, with optional filtering
app.get("/tasks", (req, res) => {
  let filteredTasks = tasks;

  if (req.query.completed !== undefined) {
    if (req.query.completed !== "true" && req.query.completed !== "false") {
      return res.status(400).json({
        message: "completed must be true or false",
      });
    }

    const completed = req.query.completed === "true";
    filteredTasks = tasks.filter((task) => task.completed === completed);
  }

  res.status(200).json(filteredTasks);
});

// GET /tasks/:id - Get a task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseTaskId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body || {};

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      message:
        "title and description must be non-empty strings, and completed must be a boolean",
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: title.trim(),
    description: description.trim(),
    completed,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
app.put("/tasks/:id", (req, res) => {
  const id = parseTaskId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const { title, description, completed } = req.body || {};

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "Invalid task data",
    });
  }

  task.title = title.trim();
  task.description = description.trim();
  task.completed = completed;

  res.status(200).json(task);
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseTaskId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
  });
});

// Start the server only when app.js is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = app;
