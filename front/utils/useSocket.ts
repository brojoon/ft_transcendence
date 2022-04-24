import io from 'socket.io-client';
import { useCallback } from 'react';

let socket: any = undefined;

const getSocket = () => {
  if (!socket) {
    socket = io.connect('http://42transcendence/api');
  }

  return socket;
};

export default getSocket;
