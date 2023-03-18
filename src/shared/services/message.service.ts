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
    const files = await this.api.uploadFiles<BackendFile[]>('message/addFiles', formData, 'post');
    return files;

    // try {
    //   const config: AxiosRequestConfig = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': `Bearer ${localStorage.getItem(JWT_ACCESS_TOKEN)}`,
    //     },
    //   };
    //   const response = await axios.post(`${SERVER_URL}message/addFiles`, formData, config);

    //   return response.data as BackendFile[];
    // } catch (error) {
    //   throw new Error('Cannot load files');
    // }
  }

  async getFile(fileId: string) {
    const response = await this.api.getFile(`message/files/${fileId}`);
    return response;
    // const config: AxiosRequestConfig = {
    //   responseType: 'blob',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem(JWT_ACCESS_TOKEN)}`,
    //   },
    // };
    // try {
    //   const response = await axios.get(`${SERVER_URL}message/files/${fileId}`, config);

    //   return response.data;
    // } catch (error) {
    //   throw new Error('Cannot get file', { cause: error });
    // }
  }

  //TODO: responses
  async getByChatId(chatId: string) {
    const messages = await this.api.get<BackendMessage[]>(`chat/${chatId}/messages`);
    return messages.map((m) => backendMessageToEntityFactory(m));

    // try {
    //   const token = localStorage.getItem(JWT_ACCESS_TOKEN);
    //   const config = { headers: { Authorization: `Bearer ${token}` } };

    //   const messages = (await (
    //     await axios.get(`${SERVER_URL}chat/${chatId}/messages`, config)
    //   ).data) as BackendMessage[];
    //   //TODO: responses
    //   return messages.map((m) => ({ ...m, creationDate: m.createdAt.toString(), responses: [], user: m.creatorId }));
    // } catch (error) {
    //   throw new Error('Cannot get chat messages', { cause: error });
    // }
  }
}
