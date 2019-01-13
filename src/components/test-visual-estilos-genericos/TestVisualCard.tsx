import * as React from 'react';
import { View } from 'react-native';
import { Body, Row, Left, Right } from 'native-base';
import { estilosDeEmpresa } from '../../styles/estilosDeEmpresa';
import { Card } from '../compartido/base/Card';
import { CardItem } from '../compartido/base/CardItem';
import { Banner } from '../compartido/base/Banner';
import { Icon } from '../compartido/base/Icon';
import { Text } from '../compartido/base/Text';

interface IProps {
}

interface IState {
}

const coloresCard = estilosDeEmpresa.componentes.card.normal.colores;

export class TestVisualCardScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  public render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Body>
              <Banner
                icon={<Icon name='ios-pin-outline' color={coloresCard.contraste} />}
                texto={
                  <React.Fragment>
                    <Row>
                      <Left>
                        <Text color={coloresCard.note} size={10}>Origen</Text>
                      </Left>
                      <Right>
                        <Text color={coloresCard.note} size={10}>20/21/2324 99:33hs</Text>
                      </Right>
                    </Row>
                    <Row><Text color={coloresCard.contraste}>Pucha Pucha al 200</Text></Row>
                  </React.Fragment>
                }
              />
            </Body>
          </CardItem>
          <View style={{ height: 1, width: '80%', backgroundColor: coloresCard.contraste, alignSelf: 'center' }} />
          <CardItem style={{ backgroundColor: coloresCard.fondo, borderColor: coloresCard.fondo }}>
            <Body>
              <Banner
                icon={<Icon name='ios-flag-outline' color={coloresCard.contraste} />}
                texto={
                  <React.Fragment>
                    <Row><Text color={coloresCard.note} size={10}>Destino</Text></Row>
                    <Row><Text color={coloresCard.contraste}>Viltipico al 200</Text></Row>
                  </React.Fragment>
                }
              />
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
