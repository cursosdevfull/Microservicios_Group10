const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(19030, () =>
  console.log("Ejecutando el backend 2 en el puerto 19030")
);
