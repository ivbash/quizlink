export type TagId = number;

export interface Tag {
  id: TagId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
