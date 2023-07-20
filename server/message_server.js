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
// let userChatRooms = [];

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
    console.log(data);
    const { uname, friendUserName } = data; // seperate incoming data
    const ids = friendUserName.split(" "); // split friends
    ids.push(uname); // make id array of user + friends
    ids.sort();
    const room = ids.join(":");

    console.log(ids);
    console.log(room);

    // id should be array of users in room
    // check if that id is in the array
    // room_id should be all usernames sorted as string
    socket.join(room);
    chatRooms.unshift({ id: ids, room, messages: [] });
    console.log(chatRooms);
    socket.emit("roomsList", chatRooms);
  });

  socket.on("loadRooms", (username) => {
    // console.log(username);
    let result = chatRooms.filter((room) => room.id.includes(username));
    socket.emit("getRooms", result);
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
