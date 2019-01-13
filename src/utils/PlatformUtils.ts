import { Platform } from 'react-native';

export const PlatformUtils = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android'
}