import getToken from '@utils/getToken';

const config = {
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${getToken()}`,
	}
}

export default config;