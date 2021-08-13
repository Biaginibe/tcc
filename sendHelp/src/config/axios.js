import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://64c5ee408b88.ngrok.io',
});
