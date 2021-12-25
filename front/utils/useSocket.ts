import io from 'socket.io-client';
import { useCallback } from 'react';

let socket: any = undefined;

const getSocket = (() => {

	if (!socket) {
		socket = io.connect('http://34.82.79.134:8081');
	}

	return socket;
})

export default getSocket;