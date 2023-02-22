import { User } from './user.entity';

export class Chat {
  constructor(
    public id: string,
    public name: string,
    public creatorId: string,
    public users: User[],
    public creationDate: string,
    public isHistorySaved?: boolean,
    public isGroup?: boolean,
    public image?: any,
  ) {}
}
