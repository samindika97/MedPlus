const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Array to store connected sockets
const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

// Function to find a socket by its ID
function findSocketById(socketId) {
  return connectedSockets.find(socket => socket.id === socketId);
}

io.on(`connection`, (socket) => {
  console.log("a user connected", socket.id);

  socket.join(10);

  // Add the new socket to the array of connected sockets
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  socket.on('private_message', (data) => {
    socket.to(10).emit("private_message", data);
    // const recipientSocket = getReceiverSocketId(data.to);
    // if (recipientSocket) {
    //   //console.log(data.message);
    //   recipientSocket.emit('private_message', { from: socket.id, message: data.message });
    // }
  });

  socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
  
});

module.exports = { app, io, server };
