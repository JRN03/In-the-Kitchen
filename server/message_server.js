/*


    !!!!TO RUN SERVER!!!!
        npm run dev


*/

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
const app = express();
const PORT = 4000;

let chatRooms = [];

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("createRoom", (data) => {
    const { uname, room } = data;
    socket.join(room);
    chatRooms.unshift({ id: uname, room, messages: [] });
    console.log(chatRooms);
    socket.emit("roomsList", chatRooms);
  });
  socket.on("findRoom", (id) => {
    console.log(chatRooms);
    console.log("id ", id);
    let result = chatRooms.filter((room) => room.room == id);
    console.log("result =", result);
    socket.emit("foundRoom", result[0].messages);
    console.log("Messages Form", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    console.log(data);
    const { room_id, message, username, timestamp } = data;
    let result = chatRooms.filter((room) => room.room == room_id);
    const newMessage = {
      text: message,
      username,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    console.log("New Message", newMessage);
    socket.to(result[0].name).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(chatRooms);
});

server.listen(PORT, () => `server is running on port ${PORT}`);
