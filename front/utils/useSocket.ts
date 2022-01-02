import io from 'socket.io-client';
import { useCallback } from 'react';

let socket: any = undefined;

const getSocket = (() => {

	if (!socket) {
		socket = io.connect('https://42transcendence.ml');
	}

	return socket;
})

export default getSocket;