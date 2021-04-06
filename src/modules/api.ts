import axios from "axios";
import { BASE_URL } from "./common";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((config) => {
  return config;
});
