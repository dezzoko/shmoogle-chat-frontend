import axios from 'axios';
import { SERVER_URL } from 'core/constants/api';
import { JWT_ACCESS_TOKEN } from 'core/constants/tokens';
import { BackendConferenceRoom } from 'core/types/backend/backend-conference-room';

export class ConferenceRoomService {
  private static instance: ConferenceRoomService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async getByJoinToken(joinToken: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_ACCESS_TOKEN)}`,
      },
    };

    const room = await (
      await axios.get<BackendConferenceRoom>(`${SERVER_URL}conference-room/${joinToken}`, config)
    ).data;

    return room;
  }

  async createConferenceRoom() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(JWT_ACCESS_TOKEN)}`,
        },
      };

      const room = await (await axios.get<BackendConferenceRoom>(`${SERVER_URL}conference-room/new`, config)).data;

      return room;
    } catch (error) {
      throw new Error('Cannot create conference room', { cause: error });
    }
  }
}
