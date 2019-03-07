import * as React from 'react';
import { Header as NBHeader, Left, Body, Right, Button as NBButton, } from 'native-base';
import { ViewStyle, ActivityIndicatorProps, View } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';
import { Title } from './Title';
import { TouchableIcon } from './TouchableIcon';
import Color from 'color';

interface IProps {
  style?: ViewStyle | Array<ViewStyle>;
  right?: React.ReactElement<any>;
  left?: React.ReactElement<any>;
  titulo?: string;
  center?: React.ReactElement<any>;
  androidStatusBarColor?: string;
}

export const Header = (props: IProps) => {
  let style = props.style || {};
  style = { backgroundColor: estilosDeEmpresa.defecto.colorPrimario, ...style };
  const color = Color(style.backgroundColor);
  return (
    <NBHeader
      style={style}
      androidStatusBarColor={props.androidStatusBarColor || style.backgroundColor}
      iosBarStyle={color.isLight() ? 'dark-content' : 'light-content'}
    >
      <Left>
        {
          // Por ahora con NBButton y pasando TouchableIcon funciona bien
          props.left &&
          <NBButton transparent>
            {renderChild(props.left)}
          </NBButton>
        }
      </Left>
      <Body>
        {/* Deberias pasar solo uno */}
        {props.titulo && renderChild(<Title>{props.titulo}</Title>)}
        {props.center && renderChild(props.center)}
      </Body>
      <Right>
        {
          props.right &&
          <NBButton transparent>
            {renderChild(props.right)}
          </NBButton>
          // <View style={{ alignItems: 'center', paddingBottom: 6, paddingTop: 6, paddingLeft: 15, paddingRight: 15, marginRight: -5 }}>
          //   {renderChild(props.right)}
          // </View>
        }
      </Right>
    </NBHeader>
  );
};

// Usar named functions ayuda el debugging y permite acceder al name en los renderChild
Header.Atras = function Atras(props: { onPress: () => void }) {
  return <TouchableIcon name='ios-arrow-back-outline' {...props} />
};

function renderChild(element: React.ReactElement<any>): React.ReactElement<any> {
  // Si es ActivityIndicator no tiene type
  const temp = element.type as any;
  if (temp.render && temp.render.name === 'ActivityIndicator') {
    const el = element as React.ReactElement<ActivityIndicatorProps>;
    // Por defecto trae null, lo cual cuenta y pisa nuestro color, asi que hay que separarlo
    const { color, ...resto } = el.props;
    return React.cloneElement(el, {
      color: color || estilosDeEmpresa.defecto.colorContrastePrimario,
      ...resto
    });
  }
  return React.cloneElement(element, {
    color: estilosDeEmpresa.defecto.colorContrastePrimario,
    ...element.props
  });
}