import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const fetcher = (url: string): any => axios.get(url, {
	withCredentials: true,
	// headers: {
	// 	Authorization: `Bearer ${getToken()}`,
	// }
}).then((response) => response.data).catch((error) => {

	toast.error(error.message, {
		autoClose: 4000,
		position: toast.POSITION.TOP_RIGHT,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		theme: "colored"
	});
	if (error.response.data.code === 401) {
		setTimeout(() => {
			window.location.href = '/login';
		}, 4000);

		// const history = useHistory();
		// history.push('/login');
	} else if (error.response.data.data.message === "ban 유저") {
		setTimeout(() => {
			window.location.href = '/login';
		}, 4000);
	} else {

		setTimeout(() => {
			window.location.href = '/home';
		}, 4000);
	}
	return false;

})

export default fetcher;