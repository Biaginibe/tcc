import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://9a2b5b4ac0af.ngrok.io'
})