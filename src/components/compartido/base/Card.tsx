import * as React from 'react';
import { Card as NBCard, View } from 'native-base';
import { ViewStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  style?: ViewStyle | Array<ViewStyle>;
  children?: Element;
}

const coloresCard = estilosDeEmpresa.componentes.card.normal.colores;
export const Card = (props: IProps) =>
  <NBCard style={{
    elevation: 0,
    backgroundColor: coloresCard.fondo,
    borderColor: coloresCard.fondo,
    // margin: 5,
    // borderRadius: 2,
    ...props.style
  }}>
    {props.children}
  </NBCard>;
