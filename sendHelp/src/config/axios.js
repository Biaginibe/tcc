import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://50cc63b9566b.ngrok.io'
})