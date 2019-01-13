import Config from 'react-native-config'

/**
 * Wrapper de la lib que se use para obtener las configs
 *
 * console.log('config', Config);
 * En Android este Config de la lib devuelve ademas:
 * VERSION_CODE: 1
 * VERSION_NAME: "1.0"
 * DEBUG: true
 * BUILD_TYPE: "debug"
 * APPLICATION_ID: "com.radiotul"
 * FLAVOR: ""
 */
export class CConfig {
  // static getAppleAppId(): string {
  //   return Config.APPLE_APP_ID;
  // }

  /** Tambien conocido como "paquete" */
  static getAndroidAppId(): string {
    return Config.ANDROID_APP_ID;
  }

  static getEmpresaId(): string {
    return Config.EMPRESA_ID;
  }

  static getNombreEmpresa(): String {
    return Config.NOMBRE_EMPRESA;
  }

  static getServerUrl(): string {
    const prodUrl = 'http://3.17.127.65:8080';
    // const devUrl = 'http://3.17.127.65:8080';
    const devUrl = 'http://186.190.159.84:8080';
    return CConfig.isDevelopment() ? devUrl : prodUrl;
  }

  static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  static getGeocodingApiKey(): string {
    return 'AIzaSyBV5Vaj8dwCMysbDAghe6omm0emAqoZyfM';
  }

  static isTmr(): boolean {
    return Config.EMPRESA_ID === '7d2dd460-f8d8-11e8-84ad-1f9bcd2a95af';
  }
}