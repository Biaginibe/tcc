import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://03c7-2804-431-c7fc-5f8f-dd9-1fa4-a2db-2d93.ngrok.io',
});
