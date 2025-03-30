import { Server } from "socket.io";
let io: Server;

export default {
  init(httpServer: any) {
    io = new Server(httpServer);
    return io;
  },
  getIO() {
    if (!io) {
      throw new Error("Socket.io is not initialized!");
    }
    return io;
  },
};