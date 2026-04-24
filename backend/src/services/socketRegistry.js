// backend/src/services/socketRegistry.js

// 1. IO instance
let ioInstance = null;

export const setIo = (io) => {
  ioInstance = io;
};

export const getIo = () => ioInstance;

// 2. Live User Tracking
const onlineUsers = new Map(); // userId -> socketId

// ✅ Add user
export const addUser = (userId, socketId) => {
  onlineUsers.set(userId, socketId);

  console.log("🟢 User Added:", userId);
  console.log("📊 Online Users:", Object.fromEntries(onlineUsers));
};

// ✅ Remove user
export const removeUser = (socketId) => {
  for (const [userId, id] of onlineUsers.entries()) {
    if (id === socketId) {
      onlineUsers.delete(userId);

      console.log("🔴 User Removed:", userId);
      console.log("📊 Online Users:", Object.fromEntries(onlineUsers));

      break;
    }
  }
};

// ✅ Get socket
export const getSocketId = (userId) => {
  return onlineUsers.get(userId);
};

// ✅ (Optional but useful for debugging)
export const getAllUsers = () => {
  return Object.fromEntries(onlineUsers);
};
