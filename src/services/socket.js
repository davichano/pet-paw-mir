import io from "socket.io-client";

const socket = io("http://localhost:8090/", {transports: ['websocket'],});


socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("connect_error", (err) => {
  console.log("Connection failed", err);
});

export default socket;
