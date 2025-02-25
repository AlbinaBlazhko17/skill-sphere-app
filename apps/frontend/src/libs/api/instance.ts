import axios, { type InternalAxiosRequestConfig } from 'axios';
import { StorageKeys } from '../enums';

const BASE_URL = import.meta.env.VITE_BE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);

  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers.Accept = 'application/json';
  }

  return req;
};

const handleAxiosError = (error: any) => {
  if (error.response) {
    return {
      message: error.response.data.message,
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      message: 'Network Error',
    };
  } else {
    return {
      message: error.message,
    };
  }
};

API.interceptors.request.use(authInterceptor);
API.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(handleAxiosError(error))
);
