import io from 'socket.io-client';
import { useCallback } from 'react';

let socket: any = undefined;

const getSocket = (() => {

	if (!socket) {
		socket = io.connect('http://13.209.169.93:8081');
	}

	return socket;
})

export default getSocket;