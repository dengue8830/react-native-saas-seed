import { AppState as RNAppState, AppStateStatus, NetInfo } from 'react-native';
import { PermisosUtil, TipoPermiso, EstadoPermiso } from './permisosUtils';
// import { LocationService } from './locationService';
import { http } from './http';

export interface IAppStateListener {
  onForeground?: () => void;
  onBackground?: () => void;
  onConnectivityChange?: (isConnected: boolean) => void;
  // Comentado cosas para el gps ya que no es de una app base y necesita dependencias para eso.
  // onGPSChange?: (enabled: boolean) => void;
  onPermisoUbicacionChange?: (estado: EstadoPermiso) => void;
}

class AppState {
  public listeners: IAppStateListener[];
  private interval?: NodeJS.Timeout;
  private intervalTime = 10000;
  isConnected: boolean;
  // isGPSEnabled: boolean;
  estadoPermisoUbicacion: EstadoPermiso;

  constructor() {
    RNAppState.addEventListener('change', (nextState: AppStateStatus) => this.onAppStateChange(nextState));
    // NetInfo.isConnected.addEventListener('connectionChange', (result) => console.log('conexionchange', result));
    this.listeners = [];
    // Por defecto asumimos que esta conectado sino no habria podido entrar a la app
    this.isConnected = true;
    // this.isGPSEnabled = false;
    this.estadoPermisoUbicacion = EstadoPermiso.SinDeterminar;
  }

  init() {
    this.startPolling();
  }

  addListener(listener: IAppStateListener) {
    if (!this.listeners.find(l => l === listener)) {
      this.listeners.push(listener);
    }
  }

  removeListener(listener: IAppStateListener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }

  onAppStateChange(nextState: AppStateStatus) {
    switch (nextState) {
      case 'active':
        this.listeners.forEach((listener) => listener.onForeground && listener.onForeground())
        break;
      case 'background':
        this.listeners.forEach((listener) => listener.onBackground && listener.onBackground())
        break;
      case 'inactive':
      default:
      // nada
    }
  }

  // No devuelve promesas, es un bucle, no se le puede hacer await. En todo caso hacerlo a onpoll o modificar la forma en que esto funciona
  public startPolling() {
    if (this.interval) {
      return;
    }
    // Interval ejecutara la 1ra vez tras el interval time, asi que tiramos la primera a mano
    this.onPoll();
    this.interval = setInterval(this.onPoll.bind(this), this.intervalTime);
  }

  public stopPolling() {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.interval = undefined;
  }

  private async onPoll() {
    // console.log('poll app state');
    try {
      const estadoPermisoUbicacion = await PermisosUtil.checkPermiso(TipoPermiso.Ubicacion);
      if (this.estadoPermisoUbicacion !== estadoPermisoUbicacion) {
        this.estadoPermisoUbicacion = estadoPermisoUbicacion;
        this.listeners.forEach((listener) => listener.onPermisoUbicacionChange && listener.onPermisoUbicacionChange(estadoPermisoUbicacion));
      }
      // const isGPSEnabled = (await LocationService.getStatus()).locationServicesEnabled;
      // if (this.isGPSEnabled !== isGPSEnabled) {
      //   this.isGPSEnabled = isGPSEnabled;
      //   this.listeners.forEach((listener) => listener.onGPSChange && listener.onGPSChange(isGPSEnabled));
      // }
      const isConnected = await http.isConnected();
      if (this.isConnected !== isConnected) {
        this.isConnected = isConnected;
        this.listeners.forEach((listener) => listener.onConnectivityChange && listener.onConnectivityChange(isConnected));
      }
    } catch (error) {
      // alert(isConnected);
      // this.listener && this.listener.onUbicacionError();
      console.warn('error al recuperar estados de la app', error);
    }
  }
}

export const appState = new AppState();