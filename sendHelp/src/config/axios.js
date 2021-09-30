import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://e696-2804-14c-1a1-27a2-dc0-13b0-fb3f-33f.ngrok.io',
});
