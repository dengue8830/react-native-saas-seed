import * as React from 'react';
import { Switch as NBSwitch } from 'native-base';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';
import { PlatformUtils } from '../../../utils/platformUtils';

interface IProps {
  value: boolean,
  onValueChange?: (value: boolean) => void;
  isDisabled?: boolean,
}

export const Switch = (props: IProps) => {
  let thumbColor;
  if (!props.isDisabled) {
    if (PlatformUtils.isAndroid && props.value) {
      thumbColor = estilosDeEmpresa.defecto.colorPrimario;
    }
  }
  let trackColor;
  if (!props.isDisabled) {
    trackColor = { true: estilosDeEmpresa.defecto.colorPrimario, false: undefined } as any;
  }
  return (
    <NBSwitch
      disabled={props.isDisabled}
      onValueChange={props.onValueChange}
      value={props.value}
      thumbColor={thumbColor}
      trackColor={trackColor}
    />
  );
};
