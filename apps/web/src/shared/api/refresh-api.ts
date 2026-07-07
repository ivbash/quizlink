import axios from 'axios';
import { axiosConfig } from './config';
import type { RefreshResponse } from './types';

export const refreshApi = {
  refresh() {
    return axios.post<RefreshResponse>('/api/auth/refresh', {}, axiosConfig);
  },
};
