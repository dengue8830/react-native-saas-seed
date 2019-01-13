import { Container } from 'unstated';
import { ISpinnerGlobalProps } from '../components/compartido/SpinnerGlobal';

interface IState extends ISpinnerGlobalProps {
}

export class SpinnerGlobalStateContainer extends Container<IState> {
  state = {
    isVisible: false
  };

  // async setSpinnerProps(props: ISpinnerGlobalProps) {
  //   await this.setState(props);
  // }

  async showDefault() {
    await this.setState({ isVisible: true, texto: 'Cargando...' });
  }

  async hide() {
    await this.setState({ isVisible: false });
  }
}