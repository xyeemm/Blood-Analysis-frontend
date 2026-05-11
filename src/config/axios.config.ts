import axios from "axios";

const baseUrl = () => {
	if (import.meta.env.MODE === 'development') {
		return 'http://localhost:5000/api'
	}

	return 'https://blood-analysis-backend-1.onrender.com/api'
}

const axiosInstance = axios.create({
  baseURL: baseUrl(),
	headers: {
		Accept: 'application/json',
	},
})

export default axiosInstance