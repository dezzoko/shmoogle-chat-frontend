import axios from 'axios';
import { SERVER_URL } from 'core/constants/api';
import { JWT_ACCESS_TOKEN } from 'core/constants/tokens';
import { BackendMessage } from 'core/types/backend/backend-message';
import { Message } from '../../core/entities/message.entity';
import { User } from '../../core/entities/user.entity';
import { CreateMessageDto, IMessageService, UpdateMessageDto } from '../../core/interfaces/message-service.interface';
import { getAvailableId } from '../utils/get-available-id';
import { UserService } from './user.service';

export class MessageService implements IMessageService {
  userService = UserService.Instance;

  messages: Message[] = [
    {
      id: '1',
      chatId: '1',
      user: this.userService.users[1],
      text: 'text',
      creationDate: new Date().toString(),
      responses: [],
      isModified: false,
    },
    {
      id: '2',
      chatId: '1',
      user: this.userService.users[1],
      text: "Sooo, let's check how that works? :->",
      creationDate: new Date().toString(),
      responses: [],
      isModified: false,
    },
    {
      id: '3',
      chatId: '1',
      user: this.userService.users[2],
      text: 'I think it will brake',
      creationDate: new Date().toString(),
      responses: [],
      isModified: false,
    },
    {
      id: '4',
      chatId: '1',
      user: this.userService.users[3],
      text: 'I am response!',
      creationDate: new Date().toString(),
      responses: [],
      responseToId: '2',
      isModified: false,
    },
  ];

  private static instance: MessageService;

  public static get Instance() {
    if (!this.instance) {
      this.instance = new this();
      this.instance.init();
      return this.instance;
    }

    return this.instance;
  }

  private init() {
    this.messages
      .filter((message) => message.responseToId)
      .forEach((message) => {
        const msg = this.messages[+message.responseToId! - 1];
        msg.responses.push(message);
      });
  }

  async getAll(chatId?: string) {
    if (!chatId) {
      return this.messages;
    }

    return this.messages.filter((message) => message.chatId === chatId);
  }

  async get(id: string) {
    return this.messages.find((message) => message.id === id) || null;
  }

  async getLastMessage(id: string) {
    const messages = await this.getAll(id);

    return messages[messages.length - 1];
  }

  async create(instance: CreateMessageDto) {
    const messageId = getAvailableId(this.messages);
    const { chatId, user, text, file, responseToId } = instance;
    const message = new Message(messageId, chatId, user, text, new Date().toString(), [], file, responseToId, false);
    this.messages.push(message);

    if (responseToId) {
      const responseTargetMessage = await this.get(responseToId);
      responseTargetMessage?.responses.push(message);
    }
    return message;
  }

  async update(id: string, data: UpdateMessageDto) {
    const message = await this.get(id);

    if (!message) {
      throw new Error('no such message!');
    }

    const { text, file } = data;
    message.text = text ?? message.text;
    message.file = file ?? message.file;
    message.isModified = true;

    return message;
  }

  async delete(id: string) {
    const index = this.messages.findIndex((message) => message.id === id);

    if (index === -1) {
      throw new Error('no such message');
    }

    this.messages.splice(index, 1);
    return true;
  }

  async getByChatId(chatId: string) {
    try {
      const token = localStorage.getItem(JWT_ACCESS_TOKEN);
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const messages = (await (
        await axios.get(`${SERVER_URL}chat/${chatId}/messages`, config)
      ).data) as BackendMessage[];
      //TODO: responses
      return messages.map((m) => ({ ...m, creationDate: m.createdAt.toString(), responses: [], user: m.creatorId }));
    } catch (error) {
      throw new Error('Cannot get chat messages', { cause: error });
    }
  }
}
