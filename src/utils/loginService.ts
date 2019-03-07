import { http } from './http';
import { ISesionAttrs } from '../models/sesion';
import { SStorage } from './storage';
import { navegacionService } from './navegacionService';
import { apis } from './apis';

class LoginService {
  async login(username: string, pass: string) {
    return await apis.login(username, pass);
  }

  async afterLogin(token: string, sesion: ISesionAttrs, history: any) {
    http.setCredenciales(token);
    await SStorage.setToken(token);
    await SStorage.setSesion(sesion);
    // fcmService.initAfterLogin();
    navegacionService.history = history;
    navegacionService.navegarDondeCorresponda();
  }

  async cerrarSesionYnavegar() {
    await apis.cerrarSesion();
    await SStorage.cerrarSesion();
    await http.clearCredenciales();
    // LocationService.stopTracker();
    await navegacionService.navegarDondeCorresponda();
  }
}

export const loginService = new LoginService();