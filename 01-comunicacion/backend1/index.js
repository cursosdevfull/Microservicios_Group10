const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(19020, () =>
  console.log("Ejecutando el backend 1 en el puerto 19020")
);
