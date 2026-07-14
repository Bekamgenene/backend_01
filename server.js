const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapiDocument = require("./openapi.json");

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build CRUD API", done: true },
  { id: 3, title: "Ship to GitHub", done: false },
];

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `Task ${taskId} not found` });
  }

  return res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body || {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `Task ${taskId} not found` });
  }

  const { title, done } = req.body || {};

  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: "Provide title or done" });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "Title must be a non-empty string" });
    }
    task.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({ error: "Done must be a boolean" });
    }
    task.done = done;
  }

  return res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task ${taskId} not found` });
  }

  tasks.splice(taskIndex, 1);
  return res.status(204).send();
});

const server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = { app, server };
