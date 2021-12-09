import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';


const fetcher = (url: string): any => axios.get(url, {
	withCredentials: true,
	// headers: {
	// 	Authorization: `Bearer ${getToken()}`,
	// }
}).then((response) => response.data).catch((error) => {
	if (error.response.data.code === 401) {
		const history = useHistory();
		history.push('/ft_transcendence/login');
		// window.location.href = '/ft_transcendence/login';
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