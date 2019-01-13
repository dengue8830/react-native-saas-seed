import * as React from 'react';
import RNDropdownAlert from 'react-native-dropdownalert';

enum Tipo {
  Success = 'success',
  Error = 'error'
}

interface IDropdownAlertOptions {
  titulo?: string;
  mensaje?: string;
  tipo?: Tipo;
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

  getDropdown(): RNDropdownAlert | undefined {
    return this.dropdown;
  }

  show(opts: IDropdownAlertOptions = {}) {
    !!this.dropdown && this.dropdown.alertWithType(opts.tipo || Tipo.Success, opts.titulo || '', opts.mensaje || '');
  }

  showExito(opts: IDropdownAlertOptions = {}) {
    this.show({
      titulo: opts.titulo || 'Listo!',
      mensaje: opts.mensaje || '',
      tipo: Tipo.Success
    });
  }

  /** Muestra un mensaje de error generico con la intencion de que lo vuelva a intentar. */
  showError(opts: IDropdownAlertOptions = {}) {
    this.show({
      titulo: opts.titulo || 'Ups!',
      mensaje: opts.mensaje || 'Se produjo un error, intenta de nuevo',
      tipo: Tipo.Error
    });
  }
}

export const toastService = new ToastService();