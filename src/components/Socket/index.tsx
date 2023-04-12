import React from 'react';
import { socket } from '../../socket';

export const Socket: React.FC = () => {
  console.log("aaaaa")
  socket.on('connection', () => {
    console.log('Conexão')
  })

  socket.on('disconnect', () => {
    console.log('Disconnect')
  })

  return null;
}