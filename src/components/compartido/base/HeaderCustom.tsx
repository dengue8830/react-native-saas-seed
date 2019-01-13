import * as React from 'react';
import { Header as NBHeader } from 'native-base';
import { ViewStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface IProps {
  children: Element;
  style?: ViewStyle | Array<ViewStyle>;
}

export const HeaderCustom = (props: IProps) => {
  let style = props.style || {};
  style = { backgroundColor: estilosDeEmpresa.defecto.colorPrimario, ...style };
  return (
    <NBHeader
      style={style}
      androidStatusBarColor={style.backgroundColor}
    >
      {props.children}
    </NBHeader>
  );
};
