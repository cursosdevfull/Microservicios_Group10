const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthz", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Todo está ok"));

app.get("/api/config", (req, res) =>
  res.json({
    pathBackend1:
      process.env.SERVICE_BACKEND1 || "http://localhost:19020/api/message",
  })
);

app.use("**", (req, res) => res.send("ruta no encontrada"));

module.exports = app;
