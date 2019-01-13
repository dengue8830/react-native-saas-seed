import * as React from 'react';
import { Content as NBContent, View } from 'native-base';
import { ViewStyle } from 'react-native';

interface IProps {
  style?: ViewStyle | Array<ViewStyle>;
  children?: Element;
}

/**
 * NBContent tiene padding 0, este componente agrega el padding
 * basico a todas las pantallas configurable con props.style.
 * Como no se le puede poner padding a NBContent porque se rompe (no se porque),
 * se lo ponemos a un View interno. De todas formas cualquier estilo es aplicable
 * a View asi que no seria necesario darle estilo a NBContent.
 */
export const Content = (props: IProps) =>
  <NBContent>
    <View style={{ padding: 15, ...props.style }}>
      {props.children}
    </View>
  </NBContent>;