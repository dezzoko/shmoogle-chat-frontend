import { UserStatus } from "./status.entity";

export class User {
  constructor(
    public id: string,
    public statusId: UserStatus,
    public username: string,
    public login: string,
    public avatarUrl?: string
  ) {}
}
