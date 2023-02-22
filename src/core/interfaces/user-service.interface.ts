import { BackendUser } from 'core/types/backend/backend-user';
import { User } from '../entities/user.entity';
import { IGenericService } from './generic-service.interface';

export interface IUserService extends IGenericService<User> {
  create(instance: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User | null>;
  getKnownUsers(): Promise<BackendUser[]>;
  getSelf(): Promise<BackendUser>;
}

export interface CreateUserDto {
  login: string;
  username: string;
}

export interface UpdateUserDto {
  login?: string;
  username?: string;
  statusId?: number;
  avatarUrl?: string;
}
