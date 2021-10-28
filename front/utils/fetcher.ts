import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let token = document.cookie.slice(document.cookie.indexOf('ts_token') + 9);
token = token.indexOf(' ') === -1 ? token : token.slice(0, token.indexOf(' '));

const fetcher = (url: string): any => axios.get(url, {
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${token}`,
	}
}).then((response) => response.data).catch((error) => {
	if (error.response.data.code === 401) {
		window.location.href = '/ft_transcendence/login';
	} else {
		toast.error(error.message, {
			autoClose: 3000,
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
		});
	}
	return false;
	console.dir(error);
	console.log(error.code);
})

export default fetcher;