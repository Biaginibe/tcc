import axios from "axios";

export const instance = axios.create({
  baseURL: "http://6bfd5bd045dc.ngrok.io",
});
