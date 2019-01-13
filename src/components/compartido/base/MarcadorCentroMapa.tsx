import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableIcon } from './TouchableIcon';

interface IProps {

}

export const MarcadorCentroMapa = (props: IProps) =>
  <View
    pointerEvents='none'
    style={styles.marcador}>
    <TouchableIcon name='ios-pin' size={32} />
  </View>;

const styles = StyleSheet.create({
  marcador: {
    position: 'absolute',
    top: 0,
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 1
  }
});