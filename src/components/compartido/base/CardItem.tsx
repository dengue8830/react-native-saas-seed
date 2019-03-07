import * as React from 'react';
import { CardItem as NBCardItem } from 'native-base';
import { ViewStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  style?: ViewStyle | Array<ViewStyle>;
  children?: Element;
  cardBody?: boolean;
  header?: boolean;
  footer?: boolean;
}

const coloresCard = estilosDeEmpresa.componentes.card.normal.colores;
export const CardItem = (props: IProps) =>
  <NBCardItem style={{
    backgroundColor: coloresCard.fondo,
    ...props.style
  }}
    cardBody={props.cardBody}
    header={props.header}
    footer={props.footer}
  >
    {props.children}
  </NBCardItem>;
