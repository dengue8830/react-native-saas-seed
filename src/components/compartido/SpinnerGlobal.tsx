import * as React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';
import { Subscribe } from 'unstated';
import { SpinnerGlobalStateContainer } from '../../containers/SpinnerGlobalStateContainer';
import { estilosDeEmpresa } from '../../styles/estilosDeEmpresa';

export interface ISpinnerGlobalProps {
  isVisible: boolean;
  texto?: string;
  isCancelable?: boolean;
}

// export const SpinnerGlobal = (props: IProps) =>
const SpinnerGlobal = (props: ISpinnerGlobalProps) =>
  <Spinner
    visible={props.isVisible}
    cancelable={props.isCancelable}
    textContent={props.texto || 'Cargando...'}
    textStyle={styles.texto}
    animation='fade'
    overlayColor={estilosDeEmpresa.defecto.colorPrimario} // rgba(119, 100, 202, 1)
  />;

const styles = StyleSheet.create({
  texto: {
    ...estilosDeEmpresa.defecto.texto,
    color: estilosDeEmpresa.defecto.colorContrastePrimario,
    fontWeight: '100'
  }
});

export const SpinnerGlobalConectado = () =>
  <Subscribe to={[SpinnerGlobalStateContainer]}>
    {
      (spinnerSC: SpinnerGlobalStateContainer) => <SpinnerGlobal {...spinnerSC.state} />
    }
  </Subscribe>;