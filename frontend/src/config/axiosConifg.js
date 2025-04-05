import axios from 'axios';

console.log(import.meta.env.VITE_BACKEND_API_URL)

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true
});