import { tg } from "../hooks/useTelegram";
import axios from "axios";

const authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptors = (config: any) => {
  config.headers.authorization = `Bearer ${tg?.initData}`;
  return config;
};

authHost.interceptors.request.use(authInterceptors);

export { authHost };
