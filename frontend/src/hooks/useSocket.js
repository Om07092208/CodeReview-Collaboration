import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

export const useSocket = (enabled = true) => {
  const socket = useMemo(() => {
    if (!enabled) return null;

    const url = import.meta.env.VITE_API_URL; // ✅ FIXED

    console.log("🔌 Socket connecting to:", url);

    return io(url, {
      transports: ["websocket"],
      withCredentials: true
    });
  }, [enabled]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};
