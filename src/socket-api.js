import clientSocket from 'socket.io-client';
export const API_URL = "http://localhost:8080";
const socket = clientSocket(`${API_URL}`);

export const subscribe = (newCallback) => {
  socket.on("calulate_sum_socketIo", (result) => {
    result = JSON.parse(result);
    newCallback(result);
  });
};