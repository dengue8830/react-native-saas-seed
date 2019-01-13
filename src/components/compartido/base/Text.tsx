import * as React from 'react';
import { Text as NBText } from 'native-base';
import { StyleProp, TextStyle } from 'react-native';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

export interface ITextProps { // extends NativeBase.Text
  children?: string | (string | Element)[];
  color?: string;
  size?: number;
  /** No "style" para mantener la interfaz con los wrappers que se puedan hacer y que sean intercambiables */
  textStyle?: StyleProp<TextStyle>;
  isNote?: boolean;
  // uppercase?: boolean;
  onPress?: () => void;
}

export const Text = (props: ITextProps) => {
  let style: TextStyle = {
    fontFamily: estilosDeEmpresa.defecto.texto.fontFamily
  };
  style.color = computarColor(props);
  // size
  if (props.size) {
    style.fontSize = props.size;
  } else if (props.isNote) {
    style.fontSize = estilosDeEmpresa.defecto.texto.fontSize - 3;
  } else {
    style.fontSize = estilosDeEmpresa.defecto.texto.fontSize;
  }
  return (
    <NBText
      style={[
        style,
        props.textStyle
      ]}
      note={props.isNote}
      onPress={props.onPress}
    >
      {props.children as any}
    </NBText>
  );
}

function computarColor(props: ITextProps): string {
  if (props.color) {
    return props.color;
  }
  if (props.isNote) {
    return estilosDeEmpresa.defecto.screen.colores.note;
  }
  return estilosDeEmpresa.defecto.screen.colores.contraste;
}