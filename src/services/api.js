import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://foodserver-nsal.onrender.com/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
