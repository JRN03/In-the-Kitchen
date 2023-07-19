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
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("createRoom", (data) => {
    const { uname, room } = data;
    socket.join(room);
    chatRooms.unshift({ id: uname, room, messages: [] });
    socket.emit("roomsList", chatRooms);
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
