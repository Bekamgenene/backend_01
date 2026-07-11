const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello Backend",
  });
});

app.get("/about", (req, res) => {
  res.json({
    name: "Bekam Genene",
    track: "Backend AI Engineering",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
