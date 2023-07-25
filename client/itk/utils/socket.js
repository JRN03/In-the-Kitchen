import { io } from "socket.io-client";
const socket = io(`${process.env.EXPO_PUBLIC_ENDPOINT}`);
console.log(socket);
export default socket;
