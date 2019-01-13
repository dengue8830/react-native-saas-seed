import * as React from 'react';
import { CartelError } from './MensajesGenericos';
import { Button } from './Button';
import { loginService } from '../../../utils/loginService';
import { navegacionService } from '../../../utils/navegacionService';
import { Text } from './Text';

interface IErrorProps {
  msj?: (setIsError: (isError: boolean) => void) => React.ReactElement<any>;
}

interface IErrorState {
  isError: boolean;
};

export const MsjErrorSalir = (setIsError: (isError: boolean) => void) => (
  <CartelError texto='Ups, intenta de nuevo'>
    <Button
      onPress={async () => { navegacionService.navegarDondeCorresponda(); setIsError(false) }}
      center={<Text>Reintentar</Text>}
      isBlock={true}
      style={{ marginHorizontal: 40 }}
    />
    <Button
      onPress={async () => { await loginService.cerrarSesionYnavegar(); setIsError(false) }}
      center={<Text>Cerrar sesión</Text>}
      isBlock={true}
      style={{ marginTop: 10, marginHorizontal: 40 }}
      isOutline={true}
    />
  </CartelError>
);

export class ErrorBoundary extends React.Component<IErrorProps, IErrorState> {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
    this.setIsError = this.setIsError.bind(this);
  }

  static getDerivedStateFromError(error): IErrorState {
    // Update state so the next render will show the fallback UI.
    return { isError: true };
  }

  setIsError(isError: boolean) {
    this.setState({ isError });
  }

  public render() {
    if (this.state.isError) {
      return (
        this.props.msj ? this.props.msj(this.setIsError) : <CartelError texto='Ups, intenta de nuevo' />
      );
    }
    return this.props.children;
  }
}