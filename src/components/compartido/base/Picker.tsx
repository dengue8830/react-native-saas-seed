import * as React from 'react';
import { Picker as NBPicker } from 'native-base';
import { Icon } from './Icon';
import { estilosDeEmpresa } from '@estilosDeEmpresa';

interface IProps {
  value: any,
  onChange: (value) => void,
  children: any,
  placeholder: string
}

// TODO: No se le puede cambiar el color del arrow en android :'v ver de usar algun componente para picker
// https://github.com/GeekyAnts/NativeBase/issues/1976#issuecomment-444075622
// https://stackoverflow.com/a/51813734/3744400
function PPicker(props: IProps) {
  return (
    <NBPicker
      mode='dropdown'
      iosIcon={<Icon name='arrow-down' color={estilosDeEmpresa.defecto.screen.colores.contraste} />}
      placeholder={props.placeholder}
      placeholderStyle={{ color: estilosDeEmpresa.defecto.screen.colores.note }}
      placeholderIconColor={estilosDeEmpresa.defecto.screen.colores.note}
      style={{ width: undefined, color: estilosDeEmpresa.defecto.screen.colores.contraste }}
      selectedValue={props.value}
      onValueChange={props.onChange}
    >
      {props.children}
    </NBPicker>
  );
}

PPicker.Item = NBPicker.Item;

export const Picker = PPicker;