import BackgroundGeolocation, { LocationError as BGLocationError, BackgroundGeolocationError } from 'react-native-mauron85-background-geolocation';
import { PermisosUtil, TipoPermisoUbicacion } from '../utils/permisosUtils';
import { toastService } from './toastService';
import { SStorage } from './storage';
import { APIs } from './constantes';

// Objeto completo: https://github.com/mauron85/react-native-background-geolocation#location-event
export type Location = {
  latitude: number;
  longitude: number;
}

export enum LocationEvent {
  START = 'start',
  STOP = 'stop',
  ERROR = 'error',
}

export enum LocationError {
  GPS_DESACTIVADO = 'GPS_DESACTIVADO',
  PERMISOS_NO_OTORGADOS = 'PERMISOS_NO_OTORGADOS',
  UBICACION_NO_DISPONIBLE = 'UBICACION_NO_DISPONIBLE',
  TIMEOUT = 'TIMEOUT',
  DESCONOCIDO = 'DESCONOCIDO',
  ERROR_CONFIGURACIONES = 'ERROR_CONFIGURACIONES'
}

type CheckStatus = {
  isRunning: boolean;
  locationServicesEnabled: boolean;
  authorization: AuthorizationStatus;
};

enum AuthorizationStatus {
  NOT_AUTHORIZED = BackgroundGeolocation.NOT_AUTHORIZED,
  AUTHORIZED = BackgroundGeolocation.AUTHORIZED,
  AUTHORIZED_FOREGROUND = BackgroundGeolocation.AUTHORIZED_FOREGROUND
};

/**
 * Implementado con: https://github.com/mauron85/react-native-background-geolocation
 * Ver ejemplo en: https://github.com/mauron85/react-native-background-geolocation-example/blob/master/src/scenes/Main.js
 * FIXED: mismo problema con title notificacion: https://github.com/mauron85/react-native-background-geolocation/issues/154
 */
export class LocationService {
  static updateInterval = 10000;

  static async initTracker() {
    const token = await SStorage.getToken();
    BackgroundGeolocation.configure({
      /**
       * Desired accuracy in meters. Possible values [0, 10, 100, 1000].
       * The lower the number, the more power devoted to GeoLocation resulting in higher accuracy readings.
       * 1000 results in lowest power drain and least accurate readings. @see Apple docs
       */
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      /**
       * Stationary radius in meters.
       * When stopped, the minimum distance the device must move beyond the
       * stationary location for aggressive background-tracking to engage.
       */
      stationaryRadius: 1,
      /** 
       * The minimum distance (measured in meters) a device must move horizontally
       * before an update event is generated. @see Apple docs.
       */
      distanceFilter: 1,
      notificationTitle: 'Seguimiento',
      notificationText: 'Seguimiento actvado',
      /**
       * When enabled, the plugin will emit sounds for life-cycle events of
       * background-geolocation! See debugging sounds table.
       */
      debug: false,
      /** [Android] Start background service on device boot. */
      startOnBoot: false,
      /** Allow the background-service to continue tracking when user closes the app. */
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: LocationService.updateInterval,
      fastestInterval: LocationService.updateInterval,
      activitiesInterval: LocationService.updateInterval,
      stopOnStillActivity: false,
      // notificationIconSmall: 'ic_launcher',
      maxLocations: 10000,
      /** [iOS] Switch to less accurate significant changes and region monitory when in background */
      saveBatteryOnBackground: false,
      pauseLocationUpdates: false,
      notificationIconColor: '#009035',
      notificationIconLarge: 'ic_launcher',
      notificationIconSmall: 'ic_stat_seguimiento',
      url: APIs.ACTUALIZAR_POSICION,
      httpHeaders: {
        'Authorization': `bearer ${token}`
      },
      // Customize post body
      postTemplate: {
        lat: '@latitude',
        lng: '@longitude',
        usuarioId: 'someuserid'
      }
    });
  }

  static async startTracker(tipoPermisoUbicacion: TipoPermisoUbicacion) {
    const otorgado = await PermisosUtil.solicitarPermisoDeUbicacion(tipoPermisoUbicacion);
    if (!otorgado) {
      throw new Error(LocationError.PERMISOS_NO_OTORGADOS);
    }
    const status = await LocationService.getStatus();
    if (!status.locationServicesEnabled) {
      throw new Error(LocationError.GPS_DESACTIVADO);
    }
    // you don't need to check status before start
    BackgroundGeolocation.start(); //triggers start on start event
  }

  static stopTracker() {
    BackgroundGeolocation.stop();
  }

  /**
   * Devuelve true si se ejecuto start, false en otro caso.
   */
  static async toggleTracker(solicitarPermisos: TipoPermisoUbicacion): Promise<boolean> {
    const status = await LocationService.getStatus();
    if (status.isRunning) {
      BackgroundGeolocation.stop();
      return false;
    } else {
      await LocationService.startTracker(solicitarPermisos);
      return true;
    }
  }

  static async getStatus(): Promise<CheckStatus> {
    return new Promise<CheckStatus>((resolve, reject) => {
      BackgroundGeolocation.checkStatus(
        (status: CheckStatus) => resolve(status),
        // TODO: El proveedor no define los posibles valores de error.code asi que asumimos que es igual que BGLocationError
        (error: BackgroundGeolocationError) => reject(new Error(LocationService.parsearErrorDelProveedor(error.code)))
      );
    });
  }

  // static addListener(event: LocationEvent.START, cb: (error?: any) => void) {
  //   BackgroundGeolocation.on(event, () => {});
  // }

  static removeAllListeners() {
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  static async getCurrentLocation(solicitarPermisos: TipoPermisoUbicacion): Promise<Location> {
    const otorgado = await PermisosUtil.solicitarPermisoDeUbicacion(solicitarPermisos);
    if (!otorgado) {
      throw new Error(LocationError.PERMISOS_NO_OTORGADOS);
    }
    const status = await LocationService.getStatus();
    if (!status.locationServicesEnabled) {
      throw new Error(LocationError.GPS_DESACTIVADO);
    }
    return new Promise<Location>((resolve, reject) => {
      BackgroundGeolocation.getCurrentLocation((location: Location) => {
        if (location.latitude === 0 || location.longitude === 0) {
          return reject(new Error(LocationError.DESCONOCIDO));
        }
        resolve(location);
      }, (e: BGLocationError) => reject(new Error(LocationService.parsearErrorDelProveedor(e.code))), {
          timeout: 10000, // 3 segundos
          // maximumAge: 99999,
          enableHighAccuracy: true
        });
    });
  }

  static async getCurrentLocationWithAlertDefaultMessages(solicitarPermisos: TipoPermisoUbicacion): Promise<Location> {
    try {
      return await LocationService.getCurrentLocation(solicitarPermisos);
    } catch (error) {
      // const locationError = error as LocationError;
      switch (error.message) {
        case LocationError.PERMISOS_NO_OTORGADOS:
          toastService.showError({ titulo: 'No nos diste permiso', mensaje: 'Intenta de nuevo' });
          break;
        case LocationError.GPS_DESACTIVADO:
          toastService.showError({ titulo: 'GPS desactivado', mensaje: 'Activa el gps e intenta de nuevo' });
          break;
        default:
          toastService.showError();
      }
      throw error;
    }
  }

  static async startTrackerWithAlertDefaultMessages(solicitarPermisos: TipoPermisoUbicacion): Promise<void> {
    try {
      await LocationService.startTracker(solicitarPermisos);
    } catch (error) {
      // const locationError = error as LocationError;
      switch (error.message) {
        case LocationError.PERMISOS_NO_OTORGADOS:
          toastService.showError({ titulo: 'No nos diste permiso', mensaje: 'Intenta de nuevo' });
          break;
        case LocationError.GPS_DESACTIVADO:
          toastService.showError({ titulo: 'GPS desactivado', mensaje: 'Activa el gps e intenta de nuevo' });
          break;
        default:
          toastService.showError();
      }
      throw error;
    }
  }

  /**
   * Los codigos de error del proveedor no estan todos declarados en un mismo lugar, viendo su codigo ts y java,
   * los posibles valores de error son estos y hay que parsearlos a nuestra clara e intelegible interfaz de errores.
   */
  static parsearErrorDelProveedor(errorDelProveedor: number): LocationError {
    switch (errorDelProveedor) {
      // Errores de @getCurrentLocation
      case BackgroundGeolocation.PERMISSION_DENIED:
        return LocationError.PERMISOS_NO_OTORGADOS;
      case BackgroundGeolocation.LOCATION_UNAVAILABLE:
        return LocationError.UBICACION_NO_DISPONIBLE;
      case BackgroundGeolocation.TIMEOUT:
        return LocationError.TIMEOUT;
      /**
       * Errores de @checkStatus
       * Este codigo de error no esta tipado ni da indicio de cual puede ser su valor. Indagando en el codigo, es este su valor.
       * com.marianhello.bgloc.PluginException.SETTINGS_ERROR;
       * https://github.com/mauron85/background-geolocation-android/blob/b4f7688903cbb3a601045b3d851a8b62987cbc34/src/main/java/com/marianhello/bgloc/PluginException.java
       * y lo arroja desde
       * com.marianhello.bgloc.BackgroundGeolocationFacade@locationServicesEnabled
       * https://github.com/mauron85/background-geolocation-android/blob/b4f7688903cbb3a601045b3d851a8b62987cbc34/src/main/java/com/marianhello/bgloc/BackgroundGeolocationFacade.java
       * el cual es invocado desde @checkStatus que se lo puede ver siguiendo el index.d.ts.
       */
      case 1001:
        return LocationError.ERROR_CONFIGURACIONES;
      default:
        return LocationError.DESCONOCIDO;
    }
  }
}