import type { GenericAbortSignal } from 'axios';

export interface RefreshResponse {
  accessToken: string;
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
}

interface BaseRequest {
  signal?: GenericAbortSignal;
}

export type GetRequest<T = void> = BaseRequest &
  (T extends void ? { query?: never } : { query: T });

export type PostRequest<T = void> = BaseRequest &
  (T extends void ? { data?: never } : { data: T });

export type PatchRequest<T = void> = PostRequest<T>;

export type DeleteRequest<T extends string | number = string> = GetRequest<T>;
