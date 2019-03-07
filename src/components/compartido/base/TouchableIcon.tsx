import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Icon as NBIcon, NativeBase } from 'native-base';
import { Icon } from './Icon';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

export interface ITouchableIconProps {
  onPress?: () => void;
  name: string;
  color?: string;
  errorColor?: string;
  successColor?: string;
  disabledColor?: string;
  bgColor?: string;
  size?: number;
  containerStyle?: TouchableOpacityProps['style'];
  iconStyle?: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isDisabled?: boolean;
  /**
   * Agrega los estilos necesarios para logar un icono dentro de un contenedor
   * redondeado. Ideal cuando un icono solo se pierde en un fondo de color variable como una foto.
   *
   * Usamos el size para hacer crecer el contenedor proporcionalmente,
   * si el icono de por si es grande y se acerca mucho al contenedor (ej md-share)
   * aumentar el contenedor con containerStyle={{ width: masgrande, height: masgrande }},
   * o de ultima agregar un size para el contenedor pero no seria lo ideal ya que solo algunos iconos
   * se acercan al borde.
   *
   * Usarlo en combinacion de, por ejemplo:
   * color='white'
   * bgColor='black'
   * isRounded={true}
   */
  isRounded?: boolean;
}

const defaultProps: ITouchableIconProps = {
  name: '',
  onPress: undefined,
  bgColor: 'transparent',
  errorColor: estilosDeEmpresa.defecto.colorError,
  successColor: estilosDeEmpresa.defecto.colorPrimario,
  disabledColor: estilosDeEmpresa.defecto.screen.colores.disabled,
  color: estilosDeEmpresa.defecto.screen.colores.contraste,
  size: 25,
  containerStyle: {},
  iconStyle: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDisabled: false,
  isRounded: false
};

export const TouchableIcon = (props: ITouchableIconProps) => {
  const {
    onPress = defaultProps.onPress,
    name = defaultProps.name,
    color = defaultProps.color,
    errorColor = defaultProps.errorColor,
    successColor = defaultProps.successColor,
    disabledColor = defaultProps.disabledColor,
    bgColor = defaultProps.bgColor,
    size = defaultProps.size,
    containerStyle = defaultProps.containerStyle,
    iconStyle = defaultProps.iconStyle,
    isLoading = defaultProps.isLoading,
    isError = defaultProps.isError,
    isSuccess = defaultProps.isSuccess,
    isDisabled = defaultProps.isDisabled,
    isRounded = defaultProps.isRounded
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0.5}
      style={[
        {
          backgroundColor: bgColor,
          borderRadius: 10,
          justifyContent: 'center',
          // alignItems: 'center',
          // width: size,
          // height: size
        },
        isRounded && {
          width: size,
          height: size,
          alignItems: 'center'
        },
        containerStyle
      ]}
      onPress={isDisabled ? undefined : onPress}
    >
      {
        isLoading ?
          /**
           * Agregamos iconStyle porque sino el padding que se le da al icon se va cuando aparece el loading,
           * sino habria que wrappearlo en un container y que se le pase estilos al container y eso
           * si habria que analizarlo para ver que no rompe nuestro template.
           * TODO: Arruinara cuando aparece en un input?
           */
          <ActivityIndicator size='small' color={color} style={iconStyle} />
          :
          <Icon
            name={name}
            color={isError ? errorColor : isSuccess ? successColor : isDisabled ? disabledColor : color}
            size={size}
            iconStyle={iconStyle}
          />
      }
    </TouchableOpacity>
  );
}