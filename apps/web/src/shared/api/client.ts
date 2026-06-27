import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '@/shared/config/api';
import type { RefreshResponse } from './types';

export const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

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
      const response = await axios.post<RefreshResponse>(
        '/api/auth/refresh',
        {},
        { baseURL: API_URL, withCredentials: true },
      );

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
