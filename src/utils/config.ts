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

  static getServerUrl(): string {
    const prodUrl = 'http://3.17.127.65:8080';
    // const devUrl = 'http://3.17.127.65:8080';
    const devUrl = 'http://186.190.159.84:8080';
    return CConfig.isDevelopment() ? devUrl : prodUrl;
  }

  static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}