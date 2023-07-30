const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthz", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Todo está ok"));

app.get("/api/message", (req, res) =>
  res.json({ message: "Respuesta desde el backend2" })
);

app.use("**", (req, res) => res.send("ruta no encontrada"));

module.exports = app;
