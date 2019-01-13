import * as React from 'react';
import { CardItem as NBCardItem } from 'native-base';
import { ViewStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  style?: ViewStyle | Array<ViewStyle>;
  children?: Element;
}

const coloresCard = estilosDeEmpresa.componentes.card.normal.colores;
export const CardItem = (props: IProps) =>
  <NBCardItem style={{
    backgroundColor: coloresCard.fondo,
    ...props.style
  }}
  >
    {props.children}
  </NBCardItem>;
