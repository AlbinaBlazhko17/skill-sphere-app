import axios, { type InternalAxiosRequestConfig } from 'axios';
import { StorageKeys } from '../enums';
import { VITE_BE_URL } from '../constants';

import { AxiosError } from 'axios';
import type { ApiError } from '@skill-sphere/shared';

const createApi = () => {
  return axios.create({
    baseURL: `${VITE_BE_URL}/api/v1`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);

  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers.Accept = 'application/json';
  }

  return req;
};

const handleAxiosError = (error: AxiosError<ApiError>) => {
  if (error.response) {
    return {
      message: error.response.data.error.message,
      status: error.response.status,
      data: error.response.data.error.details,
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

export const API = createApi();

API.interceptors.request.use(authInterceptor);
API.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(handleAxiosError(error))
);
