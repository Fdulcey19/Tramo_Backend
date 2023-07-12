import app from "./src/app.js";
import { PORT } from "./src/config.js";
import "./src/db.js";
import http from "http";
import { Server as SocketWebServer } from "socket.io";
import socket from "./src/socket.js";

app.use((req, res, next) => {
  return res.status(200).json("Bienvenido a TRAMO");
});

const server = http.createServer(app);

const httpServer = server.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

const io = new SocketWebServer(httpServer, {
  cors:{
    origin:'*'
  }
})
socket(io);




