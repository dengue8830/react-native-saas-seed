import * as React from 'react';
import { View } from 'react-native';
import { Input } from '../compartido/base/Input';
import { Icon } from '../compartido/base/Icon';
import { TouchableIcon } from '../compartido/base/TouchableIcon';
import { Text } from '../compartido/base/Text';

interface IProps {
}

interface IState {
  isError: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isleftIcon: boolean;
  isRightIcon: boolean;
  isSelected: boolean;
}

export class TestVisualInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isError: false,
      isDisabled: false,
      isLoading: false,
      isSuccess: false,
      isleftIcon: false,
      isRightIcon: false,
      isSelected: false
    };
  }

  public render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <Input
          placeholder='Esto es un placeholder'
          leftIcon={this.state.isleftIcon && <Icon name='ios-person-outline' />}
          rightIcon={this.state.isRightIcon && <TouchableIcon name='ios-person-outline' />}
          isError={this.state.isError}
          isDisabled={this.state.isDisabled}
          isLoading={this.state.isLoading}
          isSuccess={this.state.isSuccess}
          isSelected={this.state.isSelected}
          onTouchStart={() => this.setState({ isSelected: !this.state.isSelected })}
        />
        <Text onPress={() => this.setState({ isleftIcon: !this.state.isleftIcon })}>LeftIcon: {this.state.isleftIcon + ''}</Text>
        <Text onPress={() => this.setState({ isRightIcon: !this.state.isRightIcon })}>RightTouchableIcon: {this.state.isRightIcon + ''}</Text>
        <Text onPress={() => this.setState({ isError: !this.state.isError })}>Error: {this.state.isError + ''}</Text>
        <Text onPress={() => this.setState({ isDisabled: !this.state.isDisabled })}>Disabled: {this.state.isDisabled + ''}</Text>
        <Text onPress={() => this.setState({ isLoading: !this.state.isLoading })}>Loading: {this.state.isLoading + ''}</Text>
        <Text onPress={() => this.setState({ isSuccess: !this.state.isSuccess })}>Success: {this.state.isSuccess + ''}</Text>
      </View>
    );
  }
}
