import io from 'socket.io-client';
import { useCallback } from 'react';

let socket: any = undefined;

const getSocket = (() => {

	if (!socket) {
		socket = io.connect('http://localhost:3095');
	}

	return socket;
})

export default getSocket;