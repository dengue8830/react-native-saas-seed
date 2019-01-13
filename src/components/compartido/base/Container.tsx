import * as React from 'react';
import { Container as NBContainer } from 'native-base';
import { ViewStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  children: Element;
  style?: ViewStyle | Array<ViewStyle>;
}

export const Container = (props: IProps) => {
  let style = props.style || {};
  style = { backgroundColor: estilosDeEmpresa.defecto.screen.colores.fondo, ...style };
  return (
    <NBContainer
      style={style}
    >
      {props.children}
    </NBContainer>
  );
};