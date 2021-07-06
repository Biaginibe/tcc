import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://00a0b35737b5.ngrok.io'
})