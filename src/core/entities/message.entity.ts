import { User } from './user.entity';

// TODO: find or create file type
export class Message {
  constructor(
    public id: string,
    public chatId: string,
    public user: User,
    public text: string,
    public creationDate: string,
    public responses: Message[],
    public file?: any,
    public responseToId?: string | null,
    public isModified?: boolean,
  ) {}
}
