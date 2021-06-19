import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://10.0.0.37:3333'
})