import * as React from 'react';
import { CartelError } from './CartelesGenericos';
import { Button } from './Button';
import { loginService } from '../../../utils/loginService';
import { navegacionService } from '../../../utils/navegacionService';
import { Text } from './Text';
import { View } from 'react-native';
import { estilosDeEmpresa } from '@estilosDeEmpresa';

/**
 * Parametro que reciben los componentes invocados por ErrorBoundary.
 * Les permite decirle al ErrorBoundary que ya no muestre el componente de error.
 */
type ISetError = (isError: boolean) => void;

/**
 * Componente que pinta un screen (independiente, con bg, etc) de error con opciones a reintentar
 * recuperarse recargando el estado de la app o cerrar sesion esperando que el error se deba
 * a un estado inconsistente de su sesion.
 *
 * Principalmente usado como msj de error fatal para el error boundary general.
 */
export const MsjErrorSalirScreen = (setIsError: ISetError) => (
  <View style={{ backgroundColor: estilosDeEmpresa.defecto.screen.colores.fondo, flex: 1 }}>
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
  </View>
);

interface IErrorProps {
  /** 
   * Permite pintar un componente custom para el error.
   * Debe recibir la funcion que le permite indicar al ErrorBoundary si seguir mostrando
   * el error o no.
   */
  msj?: (setIsError: ISetError) => React.ReactElement<any>;
}

interface IErrorState {
  /** Indica al ErrorBoundary si mostrar o no el error. */
  isError: boolean;
};

/**
 * Componente base que se encarga de la logica de mostrar o no un componente de error.
 * No tratar de customizarlo para comportamiento espcifico, ESTE SOLO SE ENCARGA DE LA
 * LOGICA DE MOSTRAR O NO. Si queres algo custom como un bg creas un componete que lo pinte
 * y se lo pasas por prop "msj".
 */
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
    console.warn('errorboundary', error);
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