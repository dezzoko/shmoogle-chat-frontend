import { User } from './user.entity';
import { File } from './file.entity';
// TODO: find or create file type
export class Message {
  constructor(
    public id: number,
    public chatId: number,
    public user: User,
    public text: string,
    public creationDate: string,
    public responses: Message[],
    public files?: File[],
    public responseToId?: number | null,
    public isModified?: boolean,
  ) {}
}
