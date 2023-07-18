import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
const app = express();
const PORT = 4000;

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers = [];

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("join_room", (data) => {
    console.log(data);
    const { uname, room } = data; // Data sent from client when join_room event emitted
    console.log("room =", room);
    socket.join(room); // Join the user to a socket room

    let __createdtime__ = Date.now(); // Current timestamp

    // Send message to all users currently in the room, apart from the user that just joined
    // socket.emit("receive_message", {
    socket.to(room).emit("receive_message", {
      message: `${uname} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, uname, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello worldddd");
});

server.listen(PORT, () => `server is running on port ${PORT}`);
