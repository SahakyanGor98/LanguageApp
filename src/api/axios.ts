import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../store/setup";
import { setToken } from "../store/slices/auth/authSlice";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", "X-platform": "web" },
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = store.getState().auth;
  if (auth && auth.accessToken) {
    config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    console.log("Shakalaka");
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      try {
        const newAccessToken = (
          await axios.get(`${BASE_URL}/api/auth/refresh`, {
            withCredentials: true,
            headers: { "X-platform": "web" },
          })
        ).data.accessToken;
        store.dispatch(setToken(newAccessToken));
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        return api(prevRequest);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);
