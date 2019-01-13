import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { ErrorExtra } from '../models/errores';
import { NetInfo } from 'react-native';

export class HttpError extends ErrorExtra {
  status: HttpErrorCode;

  constructor(status: HttpErrorCode, mensaje: string = '', extra?: any) {
    super(mensaje, extra);
    this.status = status;
    // Esto quita este constructor del stacktrace pero solo esta disponible en node, no browsers
    Error.captureStackTrace(this, ErrorExtra);
  }
}

export enum HttpErrorCode {
  NoAutorizado = 401
}

export interface IHttpResponse<T> {
  data: T;
}

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ timeout: 5000 });
  }

  setCredenciales(token: string) {
    this.instance.defaults.headers.common.Authorization = 'bearer ' + token;
    // JWTUtils.parseJwt(resLogin.data.token).usuario.id
  }

  prepararError(error: any) {
    error.extra = JSON.stringify({
      url: error.request.responseURL,
      status: error.request.status,
      method: error.config.method,
      response: error.request.responseText,
    });
  }

  private tratarRequest<T>(axiosPromise: AxiosPromise): Promise<IHttpResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosPromise.then(res => {
        resolve({ data: res.data });
      }).catch(error => {
        this.prepararError(error);
        reject(new HttpError(error.request.status, error.response && error.response.data && error.response.data.error, error.extra));
      });
    });
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.tratarRequest<T>(this.instance.get(url, config));
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.tratarRequest<T>(this.instance.post(url, data, config));
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.tratarRequest<T>(this.instance.put(url, data, config));
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.tratarRequest<T>(this.instance.delete(url, config));
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.tratarRequest<T>(this.instance.head(url, config));
  }

  async isConnected() {
    try {
      const isConnected = await NetInfo.isConnected.fetch();
      if (!isConnected) {
        return false;
      }
      await this.head('https://www.google.com', { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const http = new Http();