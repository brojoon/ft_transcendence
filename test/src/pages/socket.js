import io from 'socket.io-client';

let socket = undefined;

const getSocket = (() => {
	if (!socket) {
		socket = io.connect('http://localhost:3095');
	}
	return socket;
})

export default getSocket
