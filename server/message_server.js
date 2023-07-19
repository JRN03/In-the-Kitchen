import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
const app = express();
const PORT = 4000;

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers = [];
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
    console.log(data);
    const { uname, room } = data;
    console.log(uname + " " + room);
    socket.join(room);
    chatRooms.unshift({ id: uname, room, messages: [] });
    socket.emit("roomsList", chatRooms);
  });
  // socket.on("join_room", (data) => {
  //   console.log(data);
  //   const { uname, room } = data; // Data sent from client when join_room event emitted
  //   console.log("room =", room);
  //   socket.join(room);
  //   let __createdtime__ = Date.now(); // Current timestamp
  //   socket.to(room).emit("receive_message", {
  //     message: `${uname} has joined the chat room`,
  //     username: CHAT_BOT,
  //     __createdtime__,
  //   });
  //   chatRoom = room;
  //   allUsers.push({ id: socket.id, uname, room });
  //   const chatRoomUsers = allUsers.filter((user) => user.room === room);
  //   socket.to(room).emit("chatroom_users", chatRoomUsers);
  //   console.log("all users: ", allUsers);
  // });
  // socket.on("findRoom", (id) => {
  //   let result = chatRooms.filter((room) => room.id == id);
  //   // console.log(chatRooms);
  //   socket.emit("foundRoom", result[0].messages);
  //   // console.log("Messages Form", result[0].messages);
  // });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(chatRooms);
});

server.listen(PORT, () => `server is running on port ${PORT}`);
