import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://d561-177-33-141-152.ngrok.io',
});
