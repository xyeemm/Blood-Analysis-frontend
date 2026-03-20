import axios from "axios";

const baseUrl = () => {
	if (import.meta.env.MODE === 'development') {
		return 'http://localhost:5000/api'
	}

	// return 'https://test-server-production-3f3f.up.railway.app/api/v1/'
}

const axiosInstance = axios.create({
	baseURL: baseUrl(),
	headers: {
		Accept: 'application/json',
	},
})

export default axiosInstance