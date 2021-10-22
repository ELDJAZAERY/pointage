import { BaseEntity } from "typeorm";

export interface IPagination<T extends BaseEntity> {
  items: Array<T>;
  count: number;
  page: number;
  totalPages: number;
}

export interface IEntityManager<T extends BaseEntity> {
  create(params: any): Promise<T>;
  list(filter: Record<string, any>): Promise<IPagination<T>>;
  find(filter: Record<string, any>): Promise<T>;
}
