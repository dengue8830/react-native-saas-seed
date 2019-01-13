import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../compartido/Text';

interface IProps {
}

interface IState {
}

export class TestVisualTextScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  public render() {
    return (
      <View>
        <Text isNote={true}>Texto isNote</Text>
        <Text>Texto comun</Text>
      </View>
    );
  }
}
