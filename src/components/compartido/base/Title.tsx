import * as React from 'react';
import { Title as NBTitle } from 'native-base';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';
import { TextStyle } from 'react-native';

interface IProps {
  children?: Element;
  style?: TextStyle;
  color?: string;
}

export const Title = (props: IProps) => {
  return (
    <NBTitle
      style={{
        fontFamily: estilosDeEmpresa.defecto.texto.fontFamily,
        color: estilosDeEmpresa.defecto.colorContrastePrimario,
        ...props.style
      }}>
      {props.children}
    </NBTitle>
  );
}