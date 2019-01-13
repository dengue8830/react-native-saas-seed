import * as React from 'react';
import { TestVisualInput } from './TestVisualInput';
import { TestVisualCardScreen } from './TestVisualCard';
import { TestVisualTextScreen } from './TestVisualText';
import { TestVisualButton } from './TestVisualButton';
import { TestVisualTouchableIcon } from './TestVisualTouchableIcon';
import { Container } from '../compartido/base/Container';
import { Header } from '../compartido/base/Header';
import { TouchableIcon } from '../compartido/base/TouchableIcon';
import { Icon } from '../compartido/base/Icon';
import { Content } from '../compartido/base/Content';
import { CartelError } from '../compartido/base/CartelesGenericos';

interface IProps {
}

export const TestVisualScreen = (props: IProps) =>
  <Container>
    <Header
      titulo='Test Visual'
      right={<TouchableIcon name='ios-menu-outline' />}
      left={<Icon name='ios-menu-outline' />}
    />
    <Content>
      <TestVisualInput />
      <TestVisualCardScreen />
      <TestVisualTextScreen />
      <TestVisualButton />
      <TestVisualTouchableIcon />
      <CartelError />
    </Content>
  </Container>;
