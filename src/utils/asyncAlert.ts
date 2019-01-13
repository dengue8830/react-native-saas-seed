import { Alert } from 'react-native';

interface AsyncAlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  key: string;
}

interface AlertButton {
  text?: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertOptions {
  /** @platform android */
  cancelable?: boolean;
  /** @platform android */
  onDismiss?: () => void;
}

/**
 * Wrapper de Alert de react native para
 * poder usarlo de forma async.
 */
export class AsyncAlert {

  /**
   * Devuelve la key del btn clickeado
   * @param title Titulo del alert
   * @param message Mensaje del alert
   * @param buttons Botones del alert
   * @param options Opciones del alert
   */
  static async alert(title: string, message: string, buttons: AsyncAlertButton[], options: AlertOptions): Promise<string> {
    // Convertimos los btns de esta clase a los de react native customizando el onpress para que
    // devuelve la key
    return new Promise<string>((resolve, reject) => {
      const rnbuttons: AlertButton[] = buttons.map(button => {
        const alertButton: AlertButton = {
          text: button.text,
          style: button.style,
          onPress: () => {
            // Devolvemos la key de la opcion elegida
            resolve(button.key);
          }
        };
        return alertButton;
      });
      // En caso de ser cancelable devolvemos 'cancel'
      // options.onDismiss produce un bulce infinito, hay que extraerlo en una referencia aparte
      const onDismiss = options.onDismiss;
      options = {
        ...options,
        onDismiss: () => {
          onDismiss && onDismiss();
          resolve('cancel');
        }
      };
      Alert.alert(
        title,
        message,
        rnbuttons,
        options
      );
    });
  }

}