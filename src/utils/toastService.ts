import * as React from 'react';
import * as RNDropdownAlert from 'react-native-dropdownalert';

interface IDropdownAlertOptions {
  titulo?: string;
  mensaje?: string;
  tipo?: 'success' | 'error';
  // imageSrc... etc
}

/**
 * Expone APIs para manejar el Toast
 */
class ToastService {
  /** Usamos la lib DropdownAlert para Toast bellos */
  dropdown?: RNDropdownAlert;

  setDropdown(dropdown: RNDropdownAlert) {
    this.dropdown = dropdown;
  }

  getDropdown(): RNDropdownAlert {
    return this.dropdown;
  }

  show(opts: IDropdownAlertOptions = {}) {
    !!this.dropdown && this.dropdown.alertWithType(opts.tipo, opts.titulo, opts.mensaje);
  }

  showExito(opts: IDropdownAlertOptions = {}) {
    this.show({
      titulo: opts.titulo || 'Listo!',
      mensaje: opts.mensaje || '',
      tipo: 'success'
    });
  }

  /** Muestra un mensaje de error generico con la intencion de que lo vuelva a intentar. */
  showError(opts: IDropdownAlertOptions = {}) {
    this.show({
      titulo: opts.titulo || 'Ups!',
      mensaje: opts.mensaje || 'Se produjo un error, intenta de nuevo',
      tipo: 'error'
    });
  }
}

export const toastService = new ToastService();