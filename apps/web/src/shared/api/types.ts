import type { GenericAbortSignal } from 'axios';

export interface RefreshResponse {
  accessToken: string;
}

export interface GetRequest {
  signal?: GenericAbortSignal;
}

export interface PostRequest<T = unknown> extends GetRequest {
  data?: T;
}
