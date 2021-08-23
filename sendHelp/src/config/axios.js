import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://4fc0-2804-431-c7fc-5f8f-f09f-5e40-3202-da5e.ngrok.io',
});
