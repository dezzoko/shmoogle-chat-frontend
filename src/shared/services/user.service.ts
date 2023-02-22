import axios from 'axios';
import { SERVER_URL } from 'core/constants/api';
import { JWT_ACCESS_TOKEN } from 'core/constants/tokens';
import { BackendUser } from 'core/types/backend/backend-user';
import { User } from '../../core/entities/user.entity';
import { CreateUserDto, IUserService, UpdateUserDto } from '../../core/interfaces/user-service.interface';
import { getAvailableId } from '../utils/get-available-id';

export class UserService implements IUserService {
  users: User[] = [
    {
      id: '1',
      login: 'qwerty1@gmail.com',
      username: 'BeastMaster64',
      statusId: 1,
    },
    {
      id: '2',
      login: 'qwerty2@gmail.com',
      username: 'Alex Fras',
      statusId: 2,
    },
    {
      id: '3',
      login: 'qwerty3@gmail.com',
      username: 'Christopher Nolan',
      statusId: 1,
    },
    {
      id: '4',
      login: 'qwerty4@gmail.com',
      username: 'John Travolta',
      statusId: 2,
    },
    {
      id: '5',
      login: 'qwerty5@gmail.com',
      username: 'Bruce Lee',
      statusId: 1,
    },
    {
      id: '6',
      login: 'qwerty6@gmail.com',
      username: 'MirageMan441',
      statusId: 1,
    },
  ];

  private static instance: UserService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async getAll() {
    return this.users;
  }

  async get(id: string) {
    return this.users.find((user) => user.id === id) || null;
  }

  async create(instance: CreateUserDto) {
    const id = getAvailableId(this.users);
    const { login, username } = instance;
    const user = new User(id, 1, username, login);
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.get(id);

    if (!user) {
      throw new Error('no such user');
    }

    const { username, login, statusId, avatarUrl } = data;
    user.login = login ?? user.login;
    user.username = username ?? user.username;
    user.statusId = statusId ?? user.statusId;
    user.avatarUrl = avatarUrl ?? user.avatarUrl;
    return user;
  }

  async delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new Error('no such user');
    }

    this.users.splice(index, 1);
    return true;
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
