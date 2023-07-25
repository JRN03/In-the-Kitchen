import { io } from "socket.io-client";
const socket = io(`${process.env.EXPO_PUBLIC_ENDPOINT}`);
export default socket;
