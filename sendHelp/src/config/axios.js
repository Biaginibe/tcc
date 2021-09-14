import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://09c8-2804-431-c7fd-78fc-903e-4f55-6b5-fed1.ngrok.io',
});
