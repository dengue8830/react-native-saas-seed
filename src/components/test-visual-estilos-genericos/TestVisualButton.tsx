import * as React from 'react';
import { View } from 'react-native';
import { Button } from '../compartido/base/Button';
import { Text } from '../compartido/base/Text';
import { Icon } from '../compartido/base/Icon';

interface IProps {
}

interface IState {
  isLoading: boolean;
  isDisabled: boolean;
  isOutline: boolean;
  isBlock: boolean;
  isSmall: boolean;
}

export class TestVisualButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: false,
      isDisabled: false,
      isOutline: false,
      isBlock: false,
      isSmall: false
    };
  }

  public render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <Button
          center={<Text textStyle={{ fontSize: 16 }}>INGRESAR</Text>}
          right={<Icon name='ios-arrow-forward' />}
          isLoading={this.state.isLoading}
          isDisabled={this.state.isDisabled}
          isOutline={this.state.isOutline}
          isSmall={this.state.isSmall}
          isBlock={this.state.isBlock}
        />
        <Text onPress={() => this.setState({ isLoading: !this.state.isLoading })}>isLoading: {this.state.isLoading + ''}</Text>
        <Text onPress={() => this.setState({ isDisabled: !this.state.isDisabled })}>isDisabled: {this.state.isDisabled + ''}</Text>
        <Text onPress={() => this.setState({ isOutline: !this.state.isOutline })}>isOutline: {this.state.isOutline + ''}</Text>
        <Text onPress={() => this.setState({ isSmall: !this.state.isSmall })}>isSmall: {this.state.isSmall + ''}</Text>
        <Text onPress={() => this.setState({ isBlock: !this.state.isBlock })}>isBlock: {this.state.isBlock + ''}</Text>
      </View>
    );
  }
}
