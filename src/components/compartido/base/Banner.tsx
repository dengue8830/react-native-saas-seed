import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { CardItem } from 'native-base';

interface IProps {
  /** Puede ser cualquier elemento, le llamamos icon por convencion */
  icon: React.ReactElement<any>;
  texto: React.ReactElement<any>;
  containerStyle?: ViewStyle;
}

/**
 * View que mantiene dos elementos alineados vertical y horizontalmente
 * de forma PROPORCIONAL y JUNTOS, es decir, aunque uno cambie de tamaño
 * no se saldra del contenedor ni se separaran.
 *
 * Puede que no sea este el componente que buscas, intenta con
 * CenteredRow o crea uno mas simple si es necesario. Este componente
 * es importante para titulos, banners, etc. por lo que no intentes
 * modificarlo para que se adapte a algo muy especifico.
 *
 * Ideal para banners informativos con texto que puede crecer y salirse.
 */
export const Banner = (props: IProps) =>
  <CardItem style={[styles.container, props.containerStyle || {}]}>
    {props.icon}
    {props.texto}
  </CardItem>;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});