import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, Image, StyleProp, ImageStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

export interface ITouchableImageProps {
  onPress?: () => void;
  image: any;
  color?: string;
  errorColor?: string;
  successColor?: string;
  disabledColor?: string;
  bgColor?: string;
  size?: number;
  containerStyle?: TouchableOpacityProps['style'];
  imageStyle?: StyleProp<ImageStyle>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isDisabled?: boolean;
}

const defaultProps: ITouchableImageProps = {
  image: '',
  onPress: undefined,
  bgColor: 'transparent',
  errorColor: estilosDeEmpresa.defecto.colorError,
  successColor: estilosDeEmpresa.defecto.colorPrimario,
  disabledColor: estilosDeEmpresa.defecto.screen.colores.disabled,
  color: undefined,
  size: 25,
  containerStyle: {},
  imageStyle: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDisabled: false
};

export const TouchableImage = (props: ITouchableImageProps) => {
  const {
    onPress = defaultProps.onPress,
    image = defaultProps.image,
    color = defaultProps.color,
    errorColor = defaultProps.errorColor,
    successColor = defaultProps.successColor,
    disabledColor = defaultProps.disabledColor,
    bgColor = defaultProps.bgColor,
    size = defaultProps.size!,
    containerStyle = defaultProps.containerStyle,
    imageStyle = defaultProps.imageStyle,
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
          <Image
            resizeMode={'contain'}
            style={[
              {
                width: size, // - Metrics.baseMargin,
                height: size, // - Metrics.baseMargin,
                tintColor: isError ? errorColor : isSuccess ? successColor : isDisabled ? disabledColor : color,
                // right: fixRightCircledImage ? 1 : null
              },
              imageStyle
            ]}
            source={image}
          />
      }
    </TouchableOpacity>
  );
}