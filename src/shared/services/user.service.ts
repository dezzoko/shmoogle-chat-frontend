import { User } from '../../core/entities/user.entity';
import { CreateUserDto, IUserService, UpdateUserDto } from '../../core/interfaces/user-service.interface';
import { getAvailableId } from '../utils/get-available-id';

export class UserService implements IUserService {
  users: User[] = [
    {
      id: 1,
      login: 'qwerty1@gmail.com',
      username: 'BeastMaster64',
      statusId: 1,
    },
    {
      id: 2,
      login: 'qwerty2@gmail.com',
      username: 'Alex Fras',
      statusId: 2,
    },
    {
      id: 3,
      login: 'qwerty3@gmail.com',
      username: 'Christopher Nolan',
      statusId: 1,
    },
    {
      id: 4,
      login: 'qwerty4@gmail.com',
      username: 'John Travolta',
      statusId: 2,
    },
    {
      id: 5,
      login: 'qwerty5@gmail.com',
      username: 'Bruce Lee',
      statusId: 1,
    },
    {
      id: 6,
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

  async get(id: number) {
    return this.users.find((user) => user.id === id) || null;
  }

  async create(instance: CreateUserDto) {
    const id = getAvailableId(this.users);
    const { login, username } = instance;
    const user = new User(id, 1, username, login);
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
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

  async delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new Error('no such user');
    }

    this.users.splice(index, 1);
    return true;
  }
async login (login:string,password:string){
  const user = this.users.find((u)=>u.login===login);
  if(!user){
    throw new Error("Электронная почта или пароль неправильные");

  }
  return user.id;

}

}
