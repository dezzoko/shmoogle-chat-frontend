import { JWT_ACCESS_TOKEN, JWT_EXPIRES_AT, JWT_REFRESH_TOKEN } from 'core/constants/tokens';
import { IAuthService, LoginBackendData } from 'core/interfaces/auth-service.interface';
import { ApiService } from './api.service';

export class AuthService implements IAuthService {
  private static instance: AuthService;
  api = ApiService.Instance;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  async login(login: string, password: string): Promise<LoginBackendData> {
    const tokens = await this.api.post<LoginBackendData>('auth/login', { login, password });
    this.setupTokens(tokens);
    return tokens;
  }

  async grantNewTokens() {
    this.api.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status !== 401 || !this.refreshToken) return Promise.reject(error);
        const tokens = await this.api.post<LoginBackendData>('auth/grantNewTokens', {
          refreshToken: this.refreshToken,
        });
        this.setupTokens(tokens);
        error.config.retry -= 1;
        return this.api.axiosInstance.request(error.config);
      },
    );
  }

  isLoggedIn(): boolean {
    const expirationDateString = localStorage.getItem(JWT_EXPIRES_AT);

    if (!expirationDateString) {
      return false;
    }

    const expirationDate = new Date(expirationDateString);

    if (expirationDate < new Date() && !this.refreshToken) {
      return false;
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem(JWT_ACCESS_TOKEN);
    // localStorage.removeItem(JWT_REFRESH_TOKEN);
    localStorage.removeItem(JWT_EXPIRES_AT);
  }

  private async setupTokens(data: LoginBackendData) {
    const expirationDate = new Date();

    expirationDate.setHours(expirationDate.getHours() + Number.parseInt(data.expiresIn));
    localStorage.setItem(JWT_ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(JWT_EXPIRES_AT, expirationDate.toString());
    localStorage.setItem(JWT_REFRESH_TOKEN, data.refreshToken);
  }

  private get accessToken() {
    return localStorage.getItem(JWT_ACCESS_TOKEN);
  }

  private get refreshToken() {
    return localStorage.getItem(JWT_REFRESH_TOKEN);
  }
}
