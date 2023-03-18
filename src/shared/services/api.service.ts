import axios, { Axios, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { SERVER_URL } from 'core/constants/api';
import { JWT_ACCESS_TOKEN } from 'core/constants/tokens';
import { ApiError } from 'shared/errors/api-error';

export class ApiService {
  private apiUrl = SERVER_URL;
  private static instance: ApiService;
  axiosInstance!: Axios;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (this.accessToken) {
        config.headers.set('Authorization', `Bearer ${this.accessToken}`);
      }
      return config;
    });

    this.axiosInstance.interceptors.response;
  }

  async get<T>(path: string, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.get<T>(`${this.apiUrl}${path}`, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error('Unhandled error');
    }
  }

  async post<T>(path: string, body: any, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.post<T>(`${this.apiUrl}${path}`, body, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error('Unhandled error');
    }
  }

  async put<T>(path: string, body: any, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.put<T>(`${this.apiUrl}${path}`, body, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error('Unhandled error');
    }
  }

  async uploadFiles<T>(path: string, formData: FormData, method: string, headers?: AxiosHeaders): Promise<T> {
    const config: AxiosRequestConfig = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };
    try {
      switch (method) {
        case 'post': {
          const response = await this.axiosInstance.post<T>(`${this.apiUrl}${path}`, formData, config);
          return response.data;
        }

        case 'put': {
          const response = await this.axiosInstance.put<T>(`${this.apiUrl}${path}`, formData, config);
          return response.data;
        }
        default:
          throw new Error('No such method to request');
      }
    } catch (error) {
      this.handleRequestError(error);
      throw new Error('Unhandled error');
    }
  }

  async getFile(path: string, headers?: AxiosHeaders) {
    const config: AxiosRequestConfig = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    config.responseType = 'blob';
    try {
      const response = await this.axiosInstance.get(`${this.apiUrl}${path}`, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error('Unhandled error');
    }
  }

  private applyHeadersConfig(headers: AxiosHeaders) {
    const config = this.baseConfig;
    config.headers = { ...this.baseConfig.headers, ...headers };
    return config;
  }

  private get baseConfig(): AxiosRequestConfig {
    if (this.accessToken) {
      return {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      } as AxiosRequestConfig;
    }
    return {};
  }

  private handleRequestError(error: any) {
    if (error.response) {
      throw new ApiError(error.response.statusText, true, error.response.status);
    } else if (error.request) {
      throw new ApiError('Cannot make request', false);
    } else {
      throw new Error(error.message, { cause: error });
    }
  }

  private get accessToken() {
    return localStorage.getItem(JWT_ACCESS_TOKEN);
  }
}
