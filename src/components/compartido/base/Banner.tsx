import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface IProps {
  icon: React.ReactElement<any>;
  texto: React.ReactElement<any>;
  containerStyle?: ViewStyle;
}

/**
 * View que mantiene dos elementos alineados vertical y horizontalmente
 * en el sentido de [icono, detalle]
 */
export const Banner = (props: IProps) =>
  <View style={[styles.container, props.containerStyle || {}]}>
    <View style={{ flex: 1 }}>
      {props.icon}
    </View>
    <View style={{ flex: 7 }}>
      {props.texto}
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: Metrics.smallMargin,
    alignItems: 'center',
    // height: 30
  }
})
