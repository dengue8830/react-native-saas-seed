import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BackHandler } from 'react-native';
import { CartelError } from './CartelesGenericos';
import { Container } from './Container';

interface IProps extends RouteComponentProps {
}

interface IState {
}

export class SinConexionScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.atras);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.atras);
  }

  atras() {
    return false;
  }

  public render() {
    return (
      <Container>
        <CartelError imgIconName='ios-planet-outline' texto='No tienes conexión' />
      </Container>
    );
  }
}
