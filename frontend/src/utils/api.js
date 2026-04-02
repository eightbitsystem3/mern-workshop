import axios from 'axios';

// Configure axios to use the backend API URL
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'http://192.168.49.2:30008'
        : 'http://localhost:8000',
    withCredentials: true // Enable cookies for cross-origin requests
});

export default api;
