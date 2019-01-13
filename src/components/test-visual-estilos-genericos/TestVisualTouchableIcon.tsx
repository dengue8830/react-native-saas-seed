import * as React from 'react';
import { View } from 'react-native';
import { TouchableIcon } from '../compartido/base/TouchableIcon';
import { Text } from '../compartido/base/Text';

interface IProps {
}

interface IState {
  isError: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export class TestVisualTouchableIcon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isError: false,
      isDisabled: false,
      isLoading: false,
      isSuccess: false
    };
  }

  public render() {
    return (
      <View>
        <TouchableIcon
          name='ios-flag-outline'
          isError={this.state.isError}
          isDisabled={this.state.isDisabled}
          isLoading={this.state.isLoading}
          isSuccess={this.state.isSuccess}
        />
        <Text onPress={() => this.setState({ isError: !this.state.isError })}>Error: {this.state.isError + ''}</Text>
        <Text onPress={() => this.setState({ isDisabled: !this.state.isDisabled })}>Disabled: {this.state.isDisabled + ''}</Text>
        <Text onPress={() => this.setState({ isLoading: !this.state.isLoading })}>Loading: {this.state.isLoading + ''}</Text>
        <Text onPress={() => this.setState({ isSuccess: !this.state.isSuccess })}>Success: {this.state.isSuccess + ''}</Text>
      </View>
    );
  }
}
