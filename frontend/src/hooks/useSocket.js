import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socketInstance = null; // ✅ GLOBAL (important)

export const useSocket = (enabled = true) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    // ✅ create only once
    if (!socketInstance) {
      const url = import.meta.env.VITE_API_URL;

      console.log("🔌 Creating socket:", url);

      socketInstance = io(url, {
        transports: ["polling", "websocket"], // ✅ Render fix
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 20,
        reconnectionDelay: 1000,
      });

      socketInstance.on("connect", () => {
        console.log("✅ Socket connected:", socketInstance.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      socketInstance.on("connect_error", (err) => {
        console.log("❌ Socket error:", err.message);
      });
    }

    setSocket(socketInstance);

    // ❌ DO NOT DISCONNECT HERE
  }, [enabled]);

  return socket;
};
