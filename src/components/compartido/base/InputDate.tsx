import * as React from 'react';
import { Input as NBInput, Item, NativeBase } from 'native-base';
import { TextInputProps, ViewStyle, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { TouchableIcon, ITouchableIconProps } from './TouchableIcon';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';
import { IThemeInput, IColorInput } from '../../../styles/estilosDeEmpresaTypes';
import { SIN_COLOR, StyleUtils } from '../../../utils/styleUtils';
import DatePicker from 'react-native-datepicker';
import moment, { Moment } from 'moment';

interface IProps {
  // containerProps?: NativeBase.Item;
  // textProps?: TextInputProps;
  placeholder?: string;
  value?: Moment;
  leftIcon?: any;
  rightIcon?: any;
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  containerStyle?: NativeBase.Item['style'];
  // inputStyle?: TextInputProps['style'];
  onChange?: (date: Moment) => void;
  // No necesita que alguien le diga si esta seleccionado
  // pero por ahora no podemos hacer nada porque no es una clase
  // y no tiene estado
  isSelected?: boolean;
  // onFocus?: () => void;
  isDisabled?: boolean;
  // onBlur?: () => void;
  // onTouchStart?: () => void;
  theme?: IThemeInput;
}

/**
 * Utilizamos https://github.com/xgfe/react-native-datepicker
 * Alternativas:
 * https://github.com/mmazzarolo/react-native-modal-datetime-picker
 * Pero lo hace con modal.
 * https://github.com/henninghall/react-native-date-picker
 * Buena idea, pero te lo pinta en la view por lo que tenes que implementar tu modal o algun lugar para que se pinte.
 *
 * El de native base anda perfecto excepto por que no anda el defaultDate... para variar... habria que actualizar pero hace que no se vean mis iconos.
 */
export const InputDate = (props: IProps) => {
  const theme = computarTheme(props);
  return (
    <Item
      style={[
        {
          borderRadius: 10,
          shadowOffset: { width: 5, height: 5, },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          borderWidth: 0.5,
          borderColor: theme.borde,
          elevation: props.isSelected ? 0.8 : 0.4,
          height: 50,
          backgroundColor: theme.fondo,
          paddingLeft: 10,
          paddingStart: 10,
          flex: 1,
          // No se porque por defecto tiene un marginLeft: 2
          marginLeft: 0
        },
        // TODO: no esta soportando array
        props.containerStyle as ViewStyle
      ]}
    >
      {
        props.leftIcon &&
        renderChild(props.leftIcon, props, theme)
      }
      <DatePicker
        style={{ flex: 1 }}
        date={props.value}
        mode='date'
        placeholder='Fecha de nacimiento'
        format='DD/MM/YYYY'
        confirmBtnText='Listo'
        cancelBtnText='Cancelar'
        showIcon={false}
        is24Hour={true}
        androidMode='spinner'
        disabled={props.isDisabled}
        onDateChange={date => props.onChange && props.onChange(moment(date, 'DD/MM/YYYY')) }
        customStyles={{
          dateInput: {
            borderWidth: 0,
            alignItems: 'flex-start'
          },
          dateText: {
            color: theme.contraste,
            fontFamily: estilosDeEmpresa.defecto.texto.fontFamily,
            fontSize: estilosDeEmpresa.defecto.texto.fontSize
          },
          placeholderText: {
            color: theme.placeholder
          },
          disabled: {
            borderWidth: 0,
            backgroundColor: 'transparent'
          },
          btnTextConfirm: {
            color: 'teal'
          }
        }}
      />
      {
        props.isLoading &&
        renderChild(<ActivityIndicator color={SIN_COLOR} size='small' style={{ paddingRight: 5 }} />, props, theme)
      }
      {
        props.rightIcon &&
        renderChild(props.rightIcon, props, theme)
      }
    </Item>
  );
}

function renderChild(element: React.ReactElement<any>, props: IProps, theme: IColorInput) {
  // Ejemplo para tipos concretos ver en button
  if (element.type === TouchableIcon) {
    const el = element as React.ReactElement<ITouchableIconProps>;
    const {
      iconStyle,
      containerStyle,
      color = theme.contraste,
      // isDisabled = props.isDisabled, // Cada componente enviara su disabled, mas flexible. Igual no funcionaba xD
      ...othersIconProps
    } = el.props;
    return React.cloneElement(el, {
      color,
      // Permitimos mostrar el loader de nuestro Icon
      // BUG: Cuando TouchableIcon muestra loader el loader se corre a la derecha.
      // FIX: Item de nativebase aplica un paddingright cuando es Icon, aplicamos el padding al contenedor y se lo quitamos al icono
      iconStyle: { paddingRight: 0, ...iconStyle },
      containerStyle: { paddingRight: 8, ...containerStyle as any },
      ...othersIconProps
    });
  }
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

function computarTheme(props: IProps): IColorInput {
  if (props.isError) {
    if (props.isDisabled) {
      return props.theme ?
        props.theme.normal.error.deshabilitado.colores :
        estilosDeEmpresa.componentes.input.normal.error.deshabilitado.colores;
    }
    if (props.isSelected) {
      return props.theme ?
        props.theme.normal.error.seleccionado.colores :
        estilosDeEmpresa.componentes.input.normal.error.seleccionado.colores;
    }
    return props.theme ?
      props.theme.normal.error.normal.colores :
      estilosDeEmpresa.componentes.input.normal.error.normal.colores;
  }
  if (props.isSuccess) {
    if (props.isDisabled) {
      return props.theme ?
        props.theme.normal.exito.deshabilitado.colores :
        estilosDeEmpresa.componentes.input.normal.exito.deshabilitado.colores;
    }
    if (props.isSelected) {
      return props.theme ?
        props.theme.normal.exito.seleccionado.colores :
        estilosDeEmpresa.componentes.input.normal.exito.seleccionado.colores;
    }
    return props.theme ?
      props.theme.normal.exito.normal.colores :
      estilosDeEmpresa.componentes.input.normal.exito.normal.colores;
  }
  // normal
  if (props.isDisabled) {
    return props.theme ?
      props.theme.normal.oscioso.deshabilitado.colores :
      estilosDeEmpresa.componentes.input.normal.oscioso.deshabilitado.colores;
  }
  if (props.isSelected) {
    return props.theme ?
      props.theme.normal.oscioso.seleccionado.colores :
      estilosDeEmpresa.componentes.input.normal.oscioso.seleccionado.colores;
  }
  return props.theme ?
    props.theme.normal.oscioso.normal.colores :
    estilosDeEmpresa.componentes.input.normal.oscioso.normal.colores;
}