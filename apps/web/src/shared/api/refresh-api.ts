import axios from 'axios';
import { apiRoutes } from '../config/routes';
import { axiosConfig } from './config';
import type { RefreshResponse } from './types';

export const refreshApi = {
  refresh() {
    return axios.post<RefreshResponse>(
      apiRoutes.auth.refresh(),
      {},
      axiosConfig,
    );
  },
};
