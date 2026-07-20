export interface TagDto {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagDto {
  name: string;
}

export interface UpdateTagDto {
  id: number;
  name?: string;
}

export interface TagFilters {
  page?: number;
  pageSize?: number;
  search?: string;
}
