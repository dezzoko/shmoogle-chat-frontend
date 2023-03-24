import { BackendUser } from 'core/types/backend/backend-user';
import { IUserService } from '../../core/interfaces/user-service.interface';
import { ApiService } from './api.service';

export class UserService implements IUserService {
  private static instance: UserService;
  api = ApiService.Instance;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async getSelf() {
    const user = await this.api.get<BackendUser>('user/self');
    return user;
  }

  async getKnownUsers() {
    const users = await this.api.get<BackendUser[]>('user/self/knownUsers');
    return users;
  }

  async update(body: any) {
    const user = await this.api.put('user/update', body);
    return user;
  }

  async updateAvatar(formData: FormData) {
    const user = await this.api.uploadFiles('user/update/avatar', formData, 'put');
    return user;
  }
}
