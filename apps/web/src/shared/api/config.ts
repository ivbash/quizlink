import type { AxiosRequestConfig } from 'axios';
import { API_URL } from '@/shared/config/api';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  withCredentials: true,
};
