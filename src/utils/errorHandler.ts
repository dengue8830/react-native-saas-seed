// import 'core-js';

import DeviceInfo from 'react-native-device-info';
import { ErrorLog } from '../models/errorLog';
import { ErrorBase } from '../models/errores';
import { ErrorUtil } from './errorUtils';
import { AsyncAlert } from './asyncAlert';
import RNExitApp from 'react-native-exit-app';
import { Component } from 'react';
import { SStorage } from './storage';
const hri = require('human-readable-ids').hri;
import { w } from './window';
import { apis } from './apis';

// declare global {
//   interface Window { MyNamespace: any; }
// }

export class ErrorHandler {

  static init() {
    // sync js handler
    ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
      ErrorHandler._handleError(error, !!isFatal);
    });
    // async js handler
    // let w: any = window;
    w.onunhandledrejection = function (error: { promise: Function, reason: Error }) {
      // No confiamos en lo que nos pueda llegar en error y capturamos lo que sea.
      // Fundamental esto porque sino entra en bucle infinito.
      try {
        ErrorHandler._handleError(error.reason, false);
      } catch (error) {
        console.log('error al intentar manejar el error v:', error);
      }
    };
    // network handler
    // http.interceptors.response.use(
    //   response => response,
    //   error => {
    //     // Necesario catch para evitar bucle de:
    //     // reportar por http -> (network error) -> interceptor axios -> (error js no catcheado) -> reportar por http -> ...
    //     try {
    //       console.log('network error interceptado', error.request);
    //       const requestMetadata: RequestMetadata | undefined = error.config.data ? JSON.parse(error.config.data) : undefined;
    //       // Necesario flag para evitar bucle de:
    //       // reportar por http -> (network error) -> interceptor axios -> reportar por http -> (network error) -> ...
    //       // Evita bucle con un flag que se coloca en _reportarError
    //       if (requestMetadata && requestMetadata.noReportarSiFalla) {
    //         console.log('network error al intentar reportar, ya no propagamos el error', error.response);
    //       } else {
    //         // Datos que nos interesan de los errores en request
    //         error.extra = JSON.stringify({
    //           url: error.request.responseURL,
    //           status: error.request.status,
    //           method: error.config.method,
    //           response: error.request.responseText,
    //         });
    //         ErrorHandler.handleError({ error });
    //       }
    //       // return Promise.reject(error);
    //     } catch (e) {
    //       console.log('error js al manejar un error http', e);
    //     }
    //   });
  }

  /**
   * Maneja el error.
   * IMPORTANTE!! Controlamos para que no haga nada al fallar, porque entra en un bucle infinito de intentar enviar el error.
   * Hay que controlar las excepciones sync dentro del metodo y las async que puedan surgir de llamar a otros metodos async.
   * @param error 
   * @param isFatal Por lo general true si se produjo en js sync
   *
   * TODO: Alert con disenio mas copado, pero necesitamos que entienda y confirme que se va a cerrar la app
   */
  static async _handleError(error: Error, isFatal: boolean, alerta?: { titulo?: string; texto?: string }) {
    try {
      console.info('ERROR_CAPTURADO', error);
      const codigo = (error as ErrorBase).codigo || hri.random();
      // async porque no importa el resultado si o si hay que continuar. Sino habria que ponerlo en su propio trycatch
      // Agregamos el catch por paranoico, por lo mencionado en la doc del metodo. aunque internamente _reportarError maneje el error y nunca lo vaya a arrojar
      // puede cambiarse eso y olvidarse agregar el catch aqui y seria fatal.
      ErrorHandler._reportarError(error, isFatal, codigo).catch(() => { });
      if (isFatal) {
        alerta = alerta || { titulo: '', texto: '' };
        const texto = alerta.texto ? `${alerta.texto}\nError: ${codigo}` : `Algo salió mal, vuelve a entrar a la app.\nError: ${codigo}`;
        const titulo = alerta.titulo || 'Ups!';
        await AsyncAlert.alert(titulo, texto, [{ text: 'OK', key: 'ok' }], { cancelable: false });
        // Fundamental cerrar la app porque al ser fatal react desmonta el componente y queda inutilizable la app
        RNExitApp.exitApp();
      } else {
        alerta = alerta || { titulo: '', texto: '' };
        const texto = alerta.texto ? `${alerta.texto}\nError: ${codigo}` : `Se produjo un error.\nError: ${codigo}`;
        const titulo = alerta.titulo || 'Ups!';
        await AsyncAlert.alert(titulo, texto, [{ text: 'OK', key: 'ok' }], { cancelable: false });
      }
    } catch (error) {
      console.info('error al manejar el error :v', error);
    }
  }

  /**
   * Metodo interno para reportar el error al servidor.
   * No muestra ningun cartel.
   * En caso de fallar no hace nada.
   */
  private static async _reportarError(error: Error, isFatal?: boolean, codigo?: string) {
    // IMPORTANTE! si queres que tire la excepcion entonces tenes que catchearlo POR LO MENOS EN _handleError para evitar un bucle.
    try {
      const errorLog = await ErrorHandler.getFullErrorLog(error, !!isFatal, codigo);
      // Evitamos bucle con interceptor poniendo flag noReportarSiFalla en true
      // No veo otra forma de agregar metadata a la request, agregar en data se hace un merge con la data pasada como 2do parametro
      // await http.post(APIs.REPORTAR_ERROR, errorLog, { data: <RequestMetadata>{ noReportarSiFalla: true } });
      await apis.reportarError(errorLog);
    } catch (error) {
      console.log('error al reportar el error :v', error);
    }
  }

  /**
   * Recibe un error, lo extiende con los datos del componente si es que existe y muestra el cartel correspondiente.
   * En caso de fallar sera capturado por el catch general y si ahi falla no hara nada.
   * Ideal para manejar un error capturado de catch.
   * @param error 
   * @param componente 
   * @param isFatal 
   */
  static async handleError(options: { error?: any; errorString?: string; componente?: Component; isFatal?: boolean; alerta?: { titulo?: string; texto?: string } }) {
    const error = options.error || new Error(options.errorString);
    if (options.componente) {
      error.extra = JSON.stringify(ErrorUtil.extraerInfoDeComponente(options.componente));
    }
    ErrorHandler._handleError(error, !!options.isFatal, options.alerta);
  }

  /**
   * Reporta el error extendiendolo con datos del componente.
   * No muestra ningun cartel.
   * En caso de fallar sera capturado por el catch general y si ahi falla no hara nada.
   * Ideal para manejar un error capturado de catch.
   */
  static async reportarError(options: { error?: any; errorString?: string; componente?: Component }) {
    const error = options.error || new Error(options.errorString);
    if (options.componente) {
      error.extra = JSON.stringify(ErrorUtil.extraerInfoDeComponente(options.componente));
    }
    ErrorHandler._reportarError(error, false);
  }

  static async getFullErrorLog(error: Error, isFatal: boolean, codigo?: string): Promise<ErrorLog> {
    const sesion = await SStorage.getSesion();
    const extra = (error as ErrorBase).extra;
    const errorLog: ErrorLog = {
      codigo: codigo,
      usuarioId: sesion && sesion.usuario.id,
      // stacktrace: error ? error.stack : undefined, // No ayuda en nada el stacktrace
      isFatal: isFatal,
      mensaje: error.message,
      extra: extra && JSON.stringify(extra),
      // Datos extras que pueden ser utiles para resolver un problema
      nivelAPI: DeviceInfo.getAPILevel(),
      // redondear antes de setear
      // https://github.com/rebeccahughes/react-native-device-info#getbatterylevel
      nivelBateria: await DeviceInfo.getBatteryLevel(),
      marca: DeviceInfo.getBrand(),
      // convertir a string https://github.com/rebeccahughes/react-native-device-info#getbuildnumber
      buildNumber: DeviceInfo.getBuildNumber(),
      operadora: DeviceInfo.getCarrier(),
      codigoPais: DeviceInfo.getDeviceCountry(),
      deviceId: DeviceInfo.getDeviceId(),
      idioma: DeviceInfo.getDeviceLocale(),
      fechaInstalacion: DeviceInfo.getFirstInstallTime() ? new Date(DeviceInfo.getFirstInstallTime()) : undefined,
      // ip necesita permiso de wifistate
      fechaActualizacion: DeviceInfo.getLastUpdateTime() ? new Date(DeviceInfo.getLastUpdateTime()) : undefined,
      fabricante: DeviceInfo.getManufacturer(),
      memoriaMaxima: DeviceInfo.getMaxMemory(),
      modelo: DeviceInfo.getModel(),
      // https://github.com/rebeccahughes/react-native-device-info#getreadableversion
      versionLegible: DeviceInfo.getReadableVersion(),
      sistemaOperativo: DeviceInfo.getSystemName(),
      versionSistemaOperativo: DeviceInfo.getSystemVersion(),
      // https://github.com/rebeccahughes/react-native-device-info#gettimezone
      zonaHoraria: DeviceInfo.getTimezone(),
      // https://github.com/rebeccahughes/react-native-device-info#getversion
      versionAplicacion: DeviceInfo.getVersion(),
      is24hs: DeviceInfo.is24Hour(),
      isEmulador: DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet()
    };
    return errorLog;
  }
}