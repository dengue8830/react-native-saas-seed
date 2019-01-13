import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BackHandler } from 'react-native';
import { Container, Content } from 'native-base';
import { Text } from './base/Text';
import { EstadoCarga } from '../../utils/estadoCarga';
import { CartelCargando, CartelError } from './base/CartelesGenericos';
import { Button } from './base/Button';
import { LocationService } from '../../utils/locationService';
import { TipoPermisoUbicacion } from '../../utils/permisosUtils';
import { toastService } from '../../utils/toastService';

interface IProps extends RouteComponentProps {
}

interface IState {
  estadoCarga: EstadoCarga,
  msjGps: string
}

export class GpsScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      estadoCarga: EstadoCarga.Ocioso,
      msjGps: ''
    };
    this.onPressObtenerPosicionGPS = this.onPressObtenerPosicionGPS.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.atras);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.atras);
  }

  atras() {
    return true;
  }

  async onPressObtenerPosicionGPS() {
    // this.setState({ estadoCarga: EstadoCarga.Cargando });
    // try {
    //   const location = await LocationService.getCurrentLocation(TipoPermisoUbicacion.CUANDO_SE_USE);
    //   this.setState({ msjGps: location.latitude + ' ' + location.longitude, estadoCarga: EstadoCarga.Ocioso });
    // } catch (error) {
    //   this.setState({ estadoCarga: EstadoCarga.Error });
    // }
    toastService.showError();
  }

  public render() {
    return (
      <Container style={{ backgroundColor: '#f8f8f8' }}>
        <Content>
          {
            this.state.estadoCarga === EstadoCarga.Cargando &&
            <CartelCargando />
          }
          {
            this.state.estadoCarga === EstadoCarga.Error &&
            <CartelError />
          }
          {
            this.state.estadoCarga === EstadoCarga.Ocioso &&
            <Text>{this.state.msjGps}</Text>
          }
          <Button
            center={<Text>Obtener posicion gps</Text>}
            onPress={this.onPressObtenerPosicionGPS}
          />
        </Content>
      </Container>
    );
  }
}
