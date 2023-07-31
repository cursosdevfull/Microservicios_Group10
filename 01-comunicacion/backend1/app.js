const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthz", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Todo está ok"));

app.get("/api/message", async (req, res) => {
  const messages = {
    msg01: "Respuesta desde el backend1",
  };

  const path =
    process.env.SERVICE_BACKEND2 || "http://localhost:19030/api/message";

  console.log("PATH", path);
  const response = await axios.get(path);

  messages.msg02 = response.data.message;

  res.json(messages);
});

app.use("**", (req, res) => res.send("ruta no encontrada"));

module.exports = app;
