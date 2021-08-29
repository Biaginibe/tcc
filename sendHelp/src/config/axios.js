import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://ce15-2804-14c-1a1-27a2-fc2e-8265-f57c-64a.ngrok.io',
});
