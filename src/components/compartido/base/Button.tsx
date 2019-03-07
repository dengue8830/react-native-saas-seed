import * as React from 'react';
import { Button as NBButton } from 'native-base';
import { ViewStyle, ActivityIndicator, ActivityIndicatorProps, RegisteredStyle } from 'react-native';
import { IThemeButton, IColorButton } from '../../../styles/estilosDeEmpresaTypes';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';
import { SIN_COLOR, StyleUtils } from '../../../utils/styleUtils';

interface IProps {
  // children: React.ReactElement<any>;
  right?: React.ReactElement<any>;
  left?: React.ReactElement<any>;
  center?: React.ReactElement<any>;
  onPress?: () => void;
  isDisabled?: boolean;
  isOutline?: boolean;
  isLoading?: boolean;
  isBlock?: boolean;
  isSmall?: boolean;
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
  theme?: IThemeButton;
}

export const Button = (props: IProps) => {
  let style = computarTheme(props);
  return (
    <NBButton
      style={[
        {
          borderRadius: 10,
          backgroundColor: style.fondo,
          borderColor: style.borde,
        },
        // typeof style === 'object' ? style : {}
        // Array.isArray(style) ? style[0] : style
        props.style as any || {}
      ]}
      disabled={props.isDisabled}
      bordered={props.isOutline}
      onPress={props.onPress}
      iconRight={props.right && !props.left}
      iconLeft={props.left && !props.right}
      block={props.isBlock}
      small={props.isSmall}
    >
      {
        props.left && renderChild(props.left, style)
      }
      {
        props.center && renderChild(props.center, style)
      }
      {
        props.isLoading
          ?
          renderChild(<ActivityIndicator color={SIN_COLOR} size='small' style={{ paddingRight: 10 }} />, style)
          :
          props.right && renderChild(props.right, style)
      }
    </NBButton>
  );
}

function renderChild(element: React.ReactElement<any>, theme: IColorButton): React.ReactElement<any> {
  // Ejemplo para tipos conocidos
  // if (element.type === Icon) {
  //   const el = element as React.ReactElement<IIconProps>;
  //   return React.cloneElement(el, {
  //     color: defaultProps.color,
  //     ...el.props
  //   });
  // }
  // Si es ActivityIndicator no tiene type
  const temp = element.type as any;
  if (temp.render && temp.render.name === 'ActivityIndicator') {
    const el = element as React.ReactElement<ActivityIndicatorProps>;
    // Por defecto trae null, lo cual cuenta y pisa nuestro color, asi que hay que separarlo
    const { color, ...resto } = el.props;
    return React.cloneElement(el, {
      color: StyleUtils.existeColor(color) ? color : theme.contraste,
      ...resto
    });
  }
  return React.cloneElement(element, {
    color: theme.contraste,
    ...element.props
  });
}

function computarTheme(props: IProps): IColorButton {
  if (props.isOutline) {
    if (props.isDisabled) {
      return props.theme ?
        props.theme.outline.oscioso.deshabilitado.colores :
        estilosDeEmpresa.componentes.button.outline.oscioso.deshabilitado.colores;
    } else {
      return props.theme ?
        props.theme.outline.oscioso.normal.colores :
        estilosDeEmpresa.componentes.button.outline.oscioso.normal.colores;
    }
  } else {
    if (props.isDisabled) {
      return props.theme ?
        props.theme.normal.oscioso.deshabilitado.colores :
        estilosDeEmpresa.componentes.button.normal.oscioso.deshabilitado.colores;
    } else {
      return props.theme ?
        props.theme.normal.oscioso.normal.colores :
        estilosDeEmpresa.componentes.button.normal.oscioso.normal.colores;
    }
  }
}