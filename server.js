const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user has connect: ", socket.id);
  socket.on("user_connect", (username) => {
    io.emit("a_user_has_connect", username);
    console.log(`${username} har joinat!`);

    socket.on("join_room", (room) => {
      socket.join(room, `${room}`);
      console.log(io.sockets.adapter.rooms);
    });
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    console.log(io.sockets.adapter.rooms);
    console.log(room);
  });

  //   socket.on("join_room", (room) => {
  //     socket.join(`${us}`room);
  //     console.log(io.sockets.adapter.rooms);
  //   });

  //   socket.on("leave1", (room) => {
  //     socket.leave(room);
  //     console.log(io.sockets.adapter.rooms);
  //   });

  socket.on("message", (obj) => {
    io.to("join_room", obj.room).emit("message", obj);
  });

  socket.on("output-message", (obj) => {
    console.log(obj);
    io.to(obj.room).emit("output-message", obj);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnect");
  });
});

server.listen(3000, () => {
  console.log("Servern är igång");
});
