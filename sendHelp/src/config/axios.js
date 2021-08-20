import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://d455e8671318.ngrok.io',
});
