import { BackendUser } from 'core/types/backend/backend-user';

export interface IUserService {
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
