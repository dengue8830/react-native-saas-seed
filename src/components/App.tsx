import React, { Component } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { Provider } from 'unstated';
import { SpinnerGlobalConectado } from './compartido/SpinnerGlobal';
import { DropdownAlert } from './compartido/base/DropdownAlert';
import { toastService } from '../utils/toastService';
// import { fcmService } from '../utils/fcmService';
import { ErrorHandler } from '../utils/errorHandler';
import { navegacionService } from '../utils/navegacionService';
import { StatusBar } from 'react-native';
import { appState, IAppStateListener } from '../utils/appState';
import { EstadoPermiso } from '../utils/permisosUtils';
import { SpinnerGlobalStateContainer } from '../containers/SpinnerGlobalStateContainer';
import { loginService } from '../utils/loginService';
import { ErrorBoundary, MsjErrorSalir } from './compartido/base/ErrorBoundary';
import { estilosDeEmpresa } from '../styles/estilosDeEmpresa';
import { TestVisualScreen } from './test-visual-estilos-genericos/TestVisualScreen';
import { SplashScreen } from './compartido/SplashScreen';
import { CConfig } from '../utils/config';
import 'moment/locale/es';
import { Rutas } from '../utils/rutas';
import { LoginScreen } from './compartido/LoginScreen';
import { GpsScreen } from './compartido/GpsScreen';

ErrorHandler.init();

const spinnerGlobalSC = new SpinnerGlobalStateContainer();

interface Props {
}
interface State {
}

export default class App extends Component<Props, State> implements IAppStateListener {

  componentDidMount() {
    // fcmService.init();
    appState.addListener(this);
  }

  componentWillUnmount() {
    // fcmService.clean();
    appState.removeListener(this);
  }

  // @overrides
  // onGPSChange(isEnabled: boolean) {
  //   if (!isEnabled) {
  //     navegacionService.navegarDondeCorresponda();
  //   }
  // }

  // TODO: falta testear en dispositivo fisico en release
  // @overrides
  onConnectivityChange(isConnected: boolean) {
    // navegacionService.refresh();
    if (!isConnected) {
      // toastService.showError({ mensaje: 'No tienes conexión' });
      spinnerGlobalSC.setState({ isVisible: true, texto: 'No tienes conexión...' });
    } else {
      spinnerGlobalSC.setState({ isVisible: false });
    }
  }

  // @overrides
  // onPermisoUbicacionChange(permiso: EstadoPermiso) {
  //   if (permiso !== EstadoPermiso.Autorizado) {
  //     navegacionService.navegarDondeCorresponda();
  //   }
  // }

  render() {
    return (
      <Provider inject={[spinnerGlobalSC]}>
        <NativeRouter>
          <React.Fragment>
            <StatusBar
              backgroundColor={estilosDeEmpresa.defecto.colorPrimario}
              barStyle={estilosDeEmpresa.componentes.statusBar.barStyle as any}
              showHideTransition={estilosDeEmpresa.componentes.statusBar.showHideTransition as any}
              hidden={true}
            />
            <ErrorBoundary msj={MsjErrorSalir}>
              <Route exact={true} path={'/'} component={TestVisualScreen} />
              {/* <Route exact={true} path={Rutas.splash} component={SplashScreen} /> */}
              <Route exact={true} path={Rutas.login} component={LoginScreen} />
              <Route exact={true} path={Rutas.helloWorld} component={GpsScreen} />
            </ErrorBoundary>
            {/* <Route exact={true} path={Rutas.sinConexion} component={SinConexionScreen} /> */}
            <SpinnerGlobalConectado />
            <DropdownAlert refProp={ref => toastService.setDropdown(ref)} />
          </React.Fragment>
        </NativeRouter>
      </Provider >
    );
  }
}