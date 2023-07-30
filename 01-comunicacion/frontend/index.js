const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(19010, () =>
  console.log("Ejecutando el frontend en el puerto 19010")
);
