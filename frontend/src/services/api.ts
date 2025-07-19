import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.SERVER_API_URL || 'http://localhost:3123',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
