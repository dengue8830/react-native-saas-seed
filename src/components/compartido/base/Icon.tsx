import * as React from 'react';
import { Icon as NBIcon } from 'native-base';
import { ViewStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

export interface IIconProps {
  name: string;
  color?: string;
  size?: number;
  /** No "style" para mantener la interfaz con TouchableIcon y que sean intercambiables */
  iconStyle?: ViewStyle;
}

export const Icon = (props: IIconProps) =>
  <NBIcon
    name={props.name}
    style={[
      {
        color: props.color || estilosDeEmpresa.defecto.screen.colores.contraste,
        fontSize: props.size || 25
      },
      props.iconStyle
    ]}
  />;
