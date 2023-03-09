export interface IAuthService {
  login(login: string, password: string): Promise<LoginBackendData>;
  isLoggedIn(): boolean;
  logout(): void;
}

export interface LoginBackendData {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}
