export interface IGenericService<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  create(instance: any): Promise<T>;
  update(id: string, data: any): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
