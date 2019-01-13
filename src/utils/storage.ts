import { AsyncStorage } from 'react-native';
import { ISesionAttrs } from '../models/sesion';

export class SStorage {
  private static SESION = 'SESION';
  private static TOKEN = 'TOKEN';

  static async setToken(raw: string) {
    await AsyncStorage.setItem(SStorage.TOKEN, raw);
  }

  static async getToken(): Promise<string | undefined> {
    return await AsyncStorage.getItem(SStorage.TOKEN) || undefined;
  }

  static async setSesion(raw: ISesionAttrs) {
    await AsyncStorage.setItem(SStorage.SESION, JSON.stringify(raw));
  }

  static async getSesion(): Promise<ISesionAttrs | undefined> {
    const jsonstring = await AsyncStorage.getItem(SStorage.SESION);
    return jsonstring ? JSON.parse(jsonstring) : undefined;
  }

  static async cerrarSesion() {
    // Todo lo que se agregue debe eliminarse
    await AsyncStorage.multiRemove([SStorage.SESION, SStorage.TOKEN]);
  }
}