import { PermissionsAndroid, Platform, Permission } from 'react-native';
import Permissions from 'react-native-permissions';
// import firebase from 'react-native-firebase';
// import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

export enum TipoPermisoUbicacion {
  SIEMPRE = 'always',
  CUANDO_SE_USE = 'whenInUse'
}

export enum TipoPermiso {
  Ubicacion = 'location'
}

export enum EstadoPermiso {
  Autorizado = 'authorized',
  Denegado = 'denied',
  Restringido = 'restricted',
  SinDeterminar = 'undetermined'
}

export class PermisosUtil {
  static async solicitarPermisoDeUbicacion(type: TipoPermisoUbicacion): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        let status = await Permissions.check('location', { type });
        if (status === 'authorized') {
          return true;
        }
        status = await Permissions.request('location', { type });
        return status === 'authorized';
      }
      // Los permisos en runtime solo son necesarios para android >= api 23 (6)
      return Number(Platform.Version) < 23 ||
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  static async checkPermiso(tipo: TipoPermiso): Promise<EstadoPermiso> {
    const respuesta: any = await Permissions.check('photo');
    return respuesta;
  }

  static async solicitarPermisosParaMicrofono() {
    try {
      if (Platform.OS === 'ios') {
        let status = await Permissions.check('microphone');
        if (status === 'authorized') {
          return true;
        }
        status = await Permissions.request('microphone');
        return status === 'authorized';
      }
      return PermisosUtil.checkearPermisosAndroidRuntime(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    } catch (error) {

    }
  }

  /** Los permisos en runtime solo son necesarios para android >= api 23 (6) */
  static async checkearPermisosAndroidRuntime(permiso: Permission) {
    return Number(Platform.Version) < 23 ||
      await PermissionsAndroid.request(permiso) === PermissionsAndroid.RESULTS.GRANTED;
  }

  static abrirConfiguraciones() {
    // TODO: Encontrar una forma sin dependencias de abrir las configuraciones
    // Permissions.openSettings();
    // BackgroundGeolocation.showAppSettings();
  }

  // static async solicitarPermisosParaRecibirEnviarPush(): Promise<boolean> {
  //   if (!await firebase.messaging().hasPermission()) {
  //     try {
  //       await firebase.messaging().requestPermission();
  //     } catch (error) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
}