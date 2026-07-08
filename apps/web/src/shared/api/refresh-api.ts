import axios from 'axios';
import { routesAPI } from '../config/routes';
import { axiosConfig } from './config';
import type { RefreshResponse } from './types';

export const refreshApi = {
  refresh() {
    return axios.post<RefreshResponse>(
      routesAPI.auth.refresh(),
      {},
      axiosConfig,
    );
  },
};
