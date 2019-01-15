import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { ErrorBase, Errores } from '../models/errores';
import { NetInfo } from 'react-native';

export enum HttpErrorCode {
  NoAutorizado = 401
}

export interface IHttpResponse<T> {
  data: T;
}

class Http {
  private instance: AxiosInstance;
  private token?: string;

  constructor() {
    this.instance = axios.create({ timeout: 5000 });
  }

  setCredenciales(token: string) {
    this.token = token;
    this.instance.defaults.headers.common.Authorization = 'bearer ' + token;
    // JWTUtils.parseJwt(resLogin.data.token).usuario.id
  }

  getToken() {
    return this.token;
  }

  private tratarRequest<T>(axiosPromise: AxiosPromise): Promise<IHttpResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosPromise.then(res => {
        resolve({ data: res.data });
      }).catch(error => {
        const extra = {
          url: error.request.responseURL,
          status: error.request.status,
          method: error.config.method,
          response: error.request.responseText
        };
        /** La causa debe corresponder con una entrada del enum Errores */
        const causa = error.response && error.response.data && error.response.data.error;
        reject(new ErrorBase(causa || Errores.Desconocido, extra));
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