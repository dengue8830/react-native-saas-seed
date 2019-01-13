import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Metrics } from '../../../utils/metrics';

interface IProps {
  icon: React.ReactElement<any>;
  titulo: React.ReactElement<any>;
  descripcion: React.ReactElement<any>;
}

export const RowDetalle = (props: IProps) =>
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      {props.icon}
    </View>
    <View style={{ flex: 3 }}>
      {props.titulo}
    </View>
    <View style={{ flex: 4 }}>
      {props.descripcion}
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
    height: 30
  }
})