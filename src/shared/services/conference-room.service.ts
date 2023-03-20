import { BackendConferenceRoom } from 'core/types/backend/backend-conference-room';
import { ApiService } from './api.service';

export class ConferenceRoomService {
  private static instance: ConferenceRoomService;
  api = ApiService.Instance;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async getByJoinToken(joinToken: string) {
    const room = await this.api.get<BackendConferenceRoom>(`conference-room/${joinToken}`);
    return room;
  }

  async createConferenceRoom() {
    const room = await this.api.get<BackendConferenceRoom>('conference-room/new');
    return room;
  }
}
