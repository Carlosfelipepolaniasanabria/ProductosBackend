import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http"; // <-- para crear servidor http
import { Server } from "socket.io"; // <-- socket.io server
import ProductsRouter from "./routes/products.routes.js";
import { apiRateLimit } from "./middleware/apiRateLimit.js";
import dotenv from "dotenv";
import { configDb } from "./config/db.js";
import cors from "cors";

const app = express();

app.use(cors());

dotenv.config();



// Crear servidor http explícito para usar con socket.io
const httpServer = http.createServer(app);

// Crear servidor socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Configurar middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(apiRateLimit);

// Pasar instancia io a router usando middleware personalizado
app.use((req, res, next) => {
  req.io = io; // añadimos io a la request para que esté disponible en rutas
  next();
});

// Rutas
app.use("/products", ProductsRouter);

// Conexiones de socket
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Conectar a base de datos
configDb();

// Levantar servidor http en vez de app directamente
const PORT = 8000;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
