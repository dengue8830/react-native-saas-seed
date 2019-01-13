import { ErrorLog } from '../models/errorLog';
import { http } from './http';
import { APIs } from './constantes';
import { ISesionAttrs } from '../models/sesion';

export const apis = {
  checkToken: () => {

  },
  login: async (username: string, pass: string) => {
    const res = await http.post<{ token?: string, sesion?: ISesionAttrs }>(APIs.LOGIN, {
      username,
      pass
    });
    return res.data;
  },
  reportarError: async (errorLog: ErrorLog) => {
    await http.post(APIs.REPORTAR_ERROR, errorLog);
  },
  cerrarSesion: () => {

  }
};