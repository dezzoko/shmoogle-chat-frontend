import { BackendMessage } from 'core/types/backend/backend-message';
import { IMessageService } from '../../core/interfaces/message-service.interface';
import { BackendFile } from 'core/types/backend/backend-file';
import { ApiService } from './api.service';
import { backendMessageToEntityFactory } from 'shared/utils/factories';

export class MessageService implements IMessageService {
  private static instance: MessageService;
  private fileReader = new FileReader();
  api = ApiService.Instance;

  public static get Instance() {
    if (!this.instance) {
      this.instance = new this();
      return this.instance;
    }

    return this.instance;
  }

  //TODO: Create fileService
  async readImageURLs(file: any): Promise<string> {
    return new Promise((res) => {
      this.fileReader.readAsDataURL(file);
      this.fileReader.onloadend = () => {
        res(this.fileReader.result!.toString());
      };
    });
  }

  async uploadFiles(formData: FormData) {
    const files = await this.api.uploadFiles<BackendFile[]>('message/addFiles', formData);
    return files;
  }

  async getFile(fileId: string) {
    const response = await this.api.getFile(`message/files/${fileId}`);
    return response;
  }

  //TODO: responses
  async getByChatId(chatId: string) {
    const messages = await this.api.get<BackendMessage[]>(`chat/${chatId}/messages`);
    return messages.map((m) => backendMessageToEntityFactory(m));
  }
}
