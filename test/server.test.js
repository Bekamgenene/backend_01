const test = require("node:test");
const assert = require("node:assert/strict");

const serverModule = require("../server");

let server;

test.before(async () => {
  server = serverModule.server;
  if (!server.listening) {
    await new Promise((resolve) => server.once("listening", resolve));
  }
});

test.after(async () => {
  if (server.listening) {
    server.close();
  }
});

test("root endpoint returns the task API description", async () => {
  const response = await fetch("http://127.0.0.1:3000/");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.name, "Task API");
  assert.equal(body.version, "1.0");
  assert.deepEqual(body.endpoints, ["/tasks"]);
});

test("health endpoint returns ok", async () => {
  const response = await fetch("http://127.0.0.1:3000/health");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: "ok" });
});

test("tasks endpoints support create and retrieve", async () => {
  const createResponse = await fetch("http://127.0.0.1:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Buy milk" }),
  });
  const createdTask = await createResponse.json();

  assert.equal(createResponse.status, 201);
  assert.equal(createdTask.title, "Buy milk");
  assert.equal(createdTask.done, false);

  const listResponse = await fetch("http://127.0.0.1:3000/tasks");
  const tasks = await listResponse.json();

  assert.equal(listResponse.status, 200);
  assert.ok(tasks.some((task) => task.title === "Buy milk"));
});

test("invalid task creation returns 400", async () => {
  const response = await fetch("http://127.0.0.1:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error, "Title is required");
});
