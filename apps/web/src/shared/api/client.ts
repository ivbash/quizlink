import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiRoutes } from '../config/routes';
import { getAccessToken, setAccessToken } from './access-token';
import { axiosConfig } from './config';
import { refreshApi } from './refresh-api';

export const client = axios.create(axiosConfig);

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}[] = [];

function processQueue(error: AxiosError | null, token: string | null = null) {
  failedQueue.forEach(({ reject, resolve }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token as string);
    }
  });
  failedQueue = [];
}

client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    } else if (
      error.response.status === 401 &&
      error.response.config.url === apiRoutes.auth.signIn()
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.set('Authorization', `Bearer ${token}`);
          return client(originalRequest);
        })
        .catch((err: AxiosError) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await refreshApi.refresh();

      const { accessToken } = response.data;
      setAccessToken(accessToken);

      originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);

      processQueue(null, accessToken);
      return client(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      processQueue(refreshError as AxiosError, null);
      // window.location.href = '/sign-in';
      return Promise.reject(refreshError as AxiosError);
    } finally {
      isRefreshing = false;
    }
  },
);
