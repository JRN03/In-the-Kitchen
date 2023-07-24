import { io } from "socket.io-client";
const socket = io(`${process.env.EXPO_PUBLIC_ENDPOINT}:4000`);
console.log(socket);
export default socket;
