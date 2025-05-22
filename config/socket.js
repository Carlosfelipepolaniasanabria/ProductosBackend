// socket.js

export default function setupSocket(io) {
  // Evento cuando un cliente se conecta
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Escuchar el evento "productAdded" desde el frontend
    socket.on("productAdded", (product) => {
      console.log("Producto recibido por socket:", product);

      // Emitir el evento "newProduct" a todos los clientes conectados
      io.emit("newProduct", product); // Esto actualizará todos los clientes con el nuevo producto
    });

    // Evento cuando un cliente se desconecta
    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
}

