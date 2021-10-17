import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://f820-201-140-244-75.ngrok.io',
});
