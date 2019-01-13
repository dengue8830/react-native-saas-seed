import * as React from 'react';
import { CardItem } from './CardItem';
import { View } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {

}

export const CardItemSeparator = (props: IProps) =>
  <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: estilosDeEmpresa.componentes.card.normal.colores.separador,
        alignSelf: 'center'
      }}
    />
  </CardItem>;
