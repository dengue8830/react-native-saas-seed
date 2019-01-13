export class ErrorLog {
  codigo?: string;
  usuarioId?: string;
  stacktrace?: string;
  // Fatal si produjo un estado inconsistente y la app se tuvo que cerrar
  isFatal?: boolean;
  // Cualquier dato que sea util, por lo general algo representando el estado en el que se produjo el error
  extra?: string;
  // String que se coloca al hacer new Error('xxx')
  mensaje?: string;
  // Datos extras que pueden ser utiles para resolver un problema
  nivelAPI?: number;
  // redondear antes de setear
  // https://github.com/rebeccahughes/react-native-device-info#getbatterylevel
  nivelBateria?: number;
  marca?: string;
  // convertir a string https://github.com/rebeccahughes/react-native-device-info#getbuildnumber
  buildNumber?: string;
  operadora?: string;
  codigoPais?: string;
  deviceId?: string;
  idioma?: string;
  fechaInstalacion?: Date;
  // ip necesita permiso de wifistate
  fechaActualizacion?: Date;
  fabricante?: string;
  memoriaMaxima?: number;
  modelo?: string;
  // https://github.com/rebeccahughes/react-native-device-info#getreadableversion
  versionLegible?: string;
  sistemaOperativo?: string;
  versionSistemaOperativo?: string;
  // https://github.com/rebeccahughes/react-native-device-info#gettimezone
  zonaHoraria?: string;
  // https://github.com/rebeccahughes/react-native-device-info#getversion
  versionAplicacion?: string;
  is24hs?: boolean;
  isEmulador?: boolean;
  isTablet?: boolean;
}