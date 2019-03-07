import { Linking } from 'react-native';
import { PlatformUtils } from './platformUtils';

/**
 * Utils para abrir recursos en apps o web.
 * Inspirado en:
 * https://github.com/flyandi/react-native-openanything/blob/master/src/youtube.js
 * https://github.com/FiberJW/react-native-app-link/blob/master/index.js
 */
export const OpenInAppUtils = {
  async youtube(options: { rawSearch: string }) {
    let search = encodeURIComponent(options.rawSearch);
    await Linking.openURL(`https://www.youtube.com/results?search_query=${search}`);
    // Otras formas de abrirlo
  },
  async store() {
    await Linking.openURL(PlatformUtils.storeLink);
  }
}