import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SStorage } from '../../utils/storage';
import { http } from '../../utils/http';
import { loginService } from '../../utils/loginService';
import { View, StatusBar } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { appState } from '../../utils/appState';
import { estilosDeEmpresa } from '../../styles/estilosDeEmpresa';
import { EstadoCarga } from '../../utils/estadoCarga';
import { CartelCargando, CartelError } from './base/CartelesGenericos';
import { Button } from './base/Button';
import { Text } from './base/Text';
import { apis } from '../../utils/apis';
import { Rutas } from '../../utils/rutas';

interface IProps extends RouteComponentProps {
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
this.props.history.push(Rutas.helloWorld); // quitar
return;
    try {
      if (!await http.isConnected()) {
        this.setState({
          estadoCarga: EstadoCarga.Error,
          msj: 'No estás conectado a internet, revisa tu conexión y vuelve a intentarlo'
        });
        return;
      }
      // http.setCredenciales(await apis.getTokenInvitado());
      if (!await apis.isServerOnline()) {
        this.setState({
          estadoCarga: EstadoCarga.Error,
          msj: 'El servicio no está disponible, intenta de nuevo en unos minutos'
        });
        return;
      }
      const tokenInvitado = await apis.getTokenInvitado();
      appState.init();
      const sesion = await SStorage.getSesion();
      const token = await SStorage.getToken();
      if (sesion && token) {
        if (await apis.isTokenValido(token)) {
          await this.initApp();
          loginService.afterLogin(token, sesion, this.props.history);
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
    } catch (error) {
      this.setState({ estadoCarga: EstadoCarga.Error });
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
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
