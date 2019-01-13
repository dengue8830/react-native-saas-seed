import * as React from 'react';
import RNDropdownAlert from 'react-native-dropdownalert';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  refProp: (ref: any) => void;
  // color: string;
  // imageSrc?: any;
}

/**
 * Wrapper para el DropdownAlert.
 * Asi podremos administrarlo y abstraernos.
 * Para tener mas opciones en la api de ToastService hay que conectar este
 * componente a un store y ahi colocar los estilos que se le pasaran a este
 * componente.
 */
export const DropdownAlert = (props: IProps) =>
  <RNDropdownAlert
    ref={props.refProp}
    successImageSrc={require('../../../images/check.png')}
    errorImageSrc={require('../../../images/error.png')}
    successColor={estilosDeEmpresa.defecto.colorPrimario}
    errorColor={estilosDeEmpresa.defecto.colorError}
    updateStatusBar={false}
    // defaultContainer={{ padding: 8, paddingTop: 20 }}
    imageStyle={{
      tintColor: estilosDeEmpresa.defecto.colorContrastePrimario,
      padding: 8,
      width: 36,
      height: 36,
      alignSelf: 'center'
    }}
    titleStyle={{
      ...estilosDeEmpresa.defecto.texto,
      color: estilosDeEmpresa.defecto.colorContrastePrimario,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left'
    }}
    messageStyle={{
      ...estilosDeEmpresa.defecto.texto,
      color: estilosDeEmpresa.defecto.colorContrastePrimario,
      textAlign: 'left'
    }}
  />;

