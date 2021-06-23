import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://5f21f34d88a0.ngrok.io'
})