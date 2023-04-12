import { io } from 'socket.io-client';

const url = 'localhost:3333';

const socket = io(url, {
  auth: {
    token: localStorage.getItem('@Web-chat:token'),
  }
});

socket.on('connected', (data) => {
  console.log(data);
});

export { socket };