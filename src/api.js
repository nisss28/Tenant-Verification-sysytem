import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Express backend
  withCredentials: true, // if using cookies/auth
});

export default api;

