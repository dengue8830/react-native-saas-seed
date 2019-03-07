import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewStyle } from 'react-native';

interface IProps {
  children?: React.ReactElement<any>[];
  containerStyle?: ViewStyle;
}

/**
 * Mantiene elementos alineados vertical y horizontalmente.
 * Es un simple wrapper de una fila alineada, ideal para usar como indicador.
 *
 * Este es un componente simple, no intentar modificarlo para hacer cosas mas complejas
 * para usarlo en casos super especificos.
 */
export function CenteredRow(props: IProps) {
  return (
    <View style={[styles.container, props.containerStyle || {}]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});