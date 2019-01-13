import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import { ViajeStateContainer } from '../../containers/ViajeStateContainer';
import { SStorage } from '../../utils/storage';
import { http } from '../../utils/http';
import { APIs } from '../../constantes';
import { loginService } from '../../utils/loginService';
import { Rutas } from '../rutas';
import { Alert, View, Image, StatusBar } from 'react-native';
import { SpinnerGlobalStateContainer } from '../../containers/SpinnerGlobalStateContainer';
import RNExitApp from 'react-native-exit-app';
import { AsyncAlert } from '../../utils/asyncAlert';
import { appState } from '../../utils/appState';
import { estilosDeEmpresa } from '../../styles/estilosDeEmpresa';
import { CartelCargando, CartelError } from './MensajesGenericos';

import { Button } from './Button';
import { Text } from './Text';
import { EstadoCarga } from '../../utils/estadoCarga';

interface IProps extends RouteComponentProps {
  viajeSC: ViajeStateContainer;
  spinnerGlobalSC: SpinnerGlobalStateContainer;
}

interface IState {
  msj: string;
  estadoCarga: EstadoCarga;
}

export class SplashScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      msj: '',
      estadoCarga: EstadoCarga.Cargando
    }
  }

  async componentDidMount() {
    // Manejando el spinner imperativamente evitamos condicion carrera show/hide
    // this.props.spinnerGlobalSC.showDefault();
    if (!await http.isConnected()) {
      this.setState({
        estadoCarga: EstadoCarga.Error,
        msj: 'No estás conectado a internet, revisa tu conexión y vuelve a intentarlo'
      });
      return;
    }    
    if (!await this.isServerStatusOk()) {
      this.setState({
        estadoCarga: EstadoCarga.Error,
        msj: 'El servicio no está disponible, intenta de nuevo en unos minutos'
      });
      return;
    }
    const tokenInvitado = await this.getTokenInvitado();
    appState.init();
    const sesion = await SStorage.getSesion();
    const token = await SStorage.getToken();
    if (sesion && token) {
      if (await this.isTokenValido(token)) {
        await this.initApp();
        // Evitamos que quede visible por carrera de show/hide
        // aunque se produce un parpadeo al navegar a otra pantalla que tenga spinnerglobal como buscando taxi
        // await this.props.spinnerGlobalSC.hide();
        loginService.afterLogin(token, sesion, this.props.viajeSC, this.props.history);
      } else {
        await SStorage.cerrarSesion();
        http.setCredenciales(tokenInvitado);
        await this.initApp();
        // await this.props.spinnerGlobalSC.hide();
        this.props.history.push(Rutas.login);
      }
    } else {
      http.setCredenciales(tokenInvitado);
      await this.initApp();
      // await this.props.spinnerGlobalSC.hide();
      this.props.history.push(Rutas.login);
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  async isServerStatusOk(): Promise<boolean> {
    try {
      // La api requiere un token de invitado por lo menos, pero si no esta disponible no podemos obtener ese token :v
      http.setCredenciales(await this.getTokenInvitado());
      await http.get(APIs.CHECK_SERVER_STATUS);
      return true;
    } catch (error) {
      // await AsyncAlert.alert('Ups!', 'El servicio está temporalmente fuera de servicio, intenta de nuevo en unos minutos', [{ text: 'OK', key: 'ok' }], { cancelable: false });
      // RNExitApp.exitApp();
      return false;
    }
  }

  async isTokenValido(token: string): Promise<boolean> {
    http.setCredenciales(token);
    try {
      await http.post(APIs.CHECK_TOKEN);
    } catch {
      return false;
    }
    return true;
  }

  async getTokenInvitado(): Promise<string> {
    const res = await http.get<{ token: string }>(APIs.TOKEN_INVITADO);
    return res.data.token;
  }

  /**
   * Setea todos los datos de empresa necesarios.
   */
  async initApp() {
    // const res = await http.get(APIs.CONFIGURACION);
    // const configuracion = Configuracion.parseItem(res.data.item);
    // await Storage.setConfiguracion(configuracion);
  }

  onPressSalir() {
    RNExitApp.exitApp();
  }

  public render() {
    // return null;
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', backgroundColor: estilosDeEmpresa.defecto.screen.colores.fondo
      }}>
        {/* <Image source={require('../../../logo-empresa.png')} style={{ width: 250, height: 250 }} /> */}
        {
          this.state.estadoCarga === EstadoCarga.Cargando &&
          <CartelCargando />
        }
        {
          this.state.estadoCarga === EstadoCarga.Error &&
          <CartelError texto={this.state.msj}>
            <Button
              onPress={this.onPressSalir}
              center={<Text>SALIR</Text>}
              isBlock={true}
              style={{ marginHorizontal: 40 }}
            />
          </CartelError>
        }
      </View>
    );
  }
}

export const SplashScreenConnected = props => (
  <Subscribe to={[ViajeStateContainer, SpinnerGlobalStateContainer]}>
    {(viajeSC: ViajeStateContainer, spinnerGlobalSC: SpinnerGlobalStateContainer) => <SplashScreen  {...props} viajeSC={viajeSC} spinnerGlobalSC={spinnerGlobalSC} />}
  </Subscribe>
);