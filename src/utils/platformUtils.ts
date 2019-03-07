import { CConfig } from './config';
import { Platform } from 'react-native';

export const PlatformUtils = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  storeLink: Platform.OS === 'ios' ?
    `itms-apps://itunes.apple.com/es/app/id${CConfig.getAppleAppId()}?mt=8` :
    `https://play.google.com/store/apps/details?id=${CConfig.getAndroidAppId()}`
}