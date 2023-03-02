import axios from 'axios';
import { SERVER_URL } from 'core/constants/api';
import { JWT_ACCESS_TOKEN, JWT_EXPIRES_AT } from 'core/constants/tokens';
import { IAuthService, LoginBackendData } from 'core/interfaces/auth-service.interface';

export class AuthService implements IAuthService {
  private static instance: AuthService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async login(login: string, password: string): Promise<LoginBackendData> {
    try {
      const tokens = await (await axios.post<LoginBackendData>(`${SERVER_URL}auth/login`, { login, password })).data;
      //const user = await (await axios.get(`${SERVER_URL}user/self`)).data as BackendUser;

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + Number.parseInt(tokens.expiresIn));
      localStorage.setItem(JWT_ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(JWT_EXPIRES_AT, expirationDate.toString());
      return tokens;
    } catch (error) {
      throw new Error('Cannot login', { cause: error });
    }
  }

  isLoggedIn(): boolean {
    const expirationDateString = localStorage.getItem(JWT_EXPIRES_AT);

    if (!expirationDateString) {
      return false;
    }

    const expirationDate = new Date(expirationDateString);

    if (expirationDate < new Date()) {
      return false;
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem(JWT_ACCESS_TOKEN);
    localStorage.removeItem(JWT_EXPIRES_AT);
  }
}
