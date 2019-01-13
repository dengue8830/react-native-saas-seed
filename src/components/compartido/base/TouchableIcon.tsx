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
  isDisabled: false
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
    isDisabled = defaultProps.isDisabled
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0.5}
      style={[
        {
          backgroundColor: bgColor,
          borderRadius: 10,
          justifyContent: 'center'
        },
        containerStyle
      ]}
      onPress={isDisabled ? undefined : onPress}
    >
      {
        isLoading ?
          <ActivityIndicator size='small' color={color} />
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