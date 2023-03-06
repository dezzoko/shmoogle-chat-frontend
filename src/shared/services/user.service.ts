import axios from 'axios';
import { SERVER_URL } from 'core/constants/api';
import { JWT_ACCESS_TOKEN } from 'core/constants/tokens';
import { BackendUser } from 'core/types/backend/backend-user';
import { IUserService } from '../../core/interfaces/user-service.interface';

export class UserService implements IUserService {
  private static instance: UserService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async getSelf() {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN);

    if (!token) {
      throw new Error('no access token!');
    }

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const user = (await (await axios.get(`${SERVER_URL}user/self`, options)).data) as BackendUser;
      return user;
    } catch (error) {
      throw new Error('Cannot get user', { cause: error });
    }
  }

  async getKnownUsers() {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN);

    if (!token) {
      throw new Error('no access token!');
    }

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const users = (await (await axios.get(`${SERVER_URL}user/self/knownUsers`, options)).data) as BackendUser[];
      return users;
    } catch (error) {
      throw new Error('Cannot get known users', { cause: error });
    }
  }
}
