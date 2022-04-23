import io from 'socket.io-client';
import { useCallback } from 'react';

let socket: any = undefined;

const getSocket = () => {
  if (!socket) {
    socket = io.connect('http://54.165.225.139:8081');
  }

  return socket;
};

export default getSocket;
