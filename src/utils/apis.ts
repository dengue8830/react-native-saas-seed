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

  },
  getTokenInvitado: async () => {
    const res = await http.get<{ token: string }>(APIs.TOKEN_INVITADO);
    return res.data.token;
  },
  checkServerStatus: async () => {
    return await http.get(APIs.CHECK_SERVER_STATUS);
  },
  isTokenValido: async (token: string) => {
    http.setCredenciales(token);
    try {
      await http.post(APIs.CHECK_TOKEN);
    } catch {
      return false;
    }
    return true;
  },
  isServerOnline: async () => {
    try {
      await apis.checkServerStatus();
      return true;
    } catch (error) {
      return false;
    }
  }
};