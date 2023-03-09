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

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem(JWT_ACCESS_TOKEN)}`,
    //   },
    // };

    // const room = await (
    //   await axios.get<BackendConferenceRoom>(`${SERVER_URL}conference-room/${joinToken}`, config)
    // ).data;

    // return room;
  }

  async createConferenceRoom() {
    const room = await this.api.get<BackendConferenceRoom>('conference-room/new');
    return room;
    // try {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem(JWT_ACCESS_TOKEN)}`,
    //     },
    //   };

    //   const room = await (await axios.get<BackendConferenceRoom>(`${SERVER_URL}conference-room/new`, config)).data;

    //   return room;
    // } catch (error) {
    //   throw new Error('Cannot create conference room', { cause: error });
    // }
  }
}
