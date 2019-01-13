import { ErrorLog } from '../models/errorLog';
import { http } from './http';
import { APIs } from './constantes';

export const apis = {
  checkToken: () => {

  },
  login: () => {

  },
  reportarError: async (errorLog: ErrorLog) => {
    await http.post(APIs.REPORTAR_ERROR, errorLog);
  }
};