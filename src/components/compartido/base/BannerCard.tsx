import * as React from 'react';
import { ViewStyle } from 'react-native';
import { Banner } from './Banner';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  icon: React.ReactElement<any>;
  texto: React.ReactElement<any>;
  containerStyle?: ViewStyle;
}

const cardColores = estilosDeEmpresa.componentes.card.normal.colores;

/**
 * Ampliacion de Banner.tsx para que no sea transparente.
 * Se podria extender para que sea info, warning, etc. pero ya
 * habria que definir eso en estilosDeEmpresa.ts > card
 */
export const BannerCard = (props: IProps) =>
  <Banner
    icon={
      React.cloneElement(props.icon, {
        color: cardColores.contraste,
        ...props.icon.props
      })
    }
    texto={
      React.cloneElement(props.texto, {
        color: cardColores.contraste,
        ...props.texto.props
      })
    }
    containerStyle={{
      backgroundColor: cardColores.fondo,
      borderRadius: 2,
      padding: 10,
      marginBottom: 5
    }}
  />;