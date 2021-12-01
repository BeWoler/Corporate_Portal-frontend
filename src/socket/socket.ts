import { io } from "socket.io-client";

export const socketConnection = () => {
  io({
    withCredentials: true,
  });
};
