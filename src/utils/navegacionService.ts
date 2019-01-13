import { SStorage } from './storage';
import { Rutas } from './rutas';
export type History = { push: (path: string, state?: any) => void };

class NavegacionService {
  history?: History;

  async navegarDondeCorresponda() {
    if (!this.history) {
      throw new Error('no existe this.history');
    }
    const sesion = await SStorage.getSesion();
    if (!sesion) {
      return this.history.push(Rutas.login);
    }
    this.history.push(Rutas.helloWorld);
  }

}

export const navegacionService = new NavegacionService();