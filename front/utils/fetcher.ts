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
	console.log(error, '에러뜸!!');
	if (error.response.data.code === 401) {
		window.location.href = '/login';
		// const history = useHistory();
		// history.push('/login');
	} else if (error.response.data.data.message === "ban 유저") {
		window.location.href = '/login';
	} else {
		console.log('toast!!');
		toast.error(error.message, {
			autoClose: 4000,
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
		});
		window.location.href = '/home';
	}
	return false;
	console.dir(error);
	console.log(error.code);
})

export default fetcher;