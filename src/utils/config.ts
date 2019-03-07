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
    return Config.SERVER_URL;
  }

  static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  static getAppleAppId(): number {
    return Config.APPLE_APP_ID; // Replace
  }

  static getAndroidAppId(): string {
    return Config.ANDROID_APP_ID; // Replace
  }
}