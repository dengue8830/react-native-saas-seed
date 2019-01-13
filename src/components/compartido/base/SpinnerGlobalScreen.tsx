import * as React from 'react';
import { SpinnerGlobalStateContainer } from '../../../containers/SpinnerGlobalStateContainer';
import { Subscribe } from 'unstated';

interface IProps {
  mensaje?: string;
}

interface IState {
}

/**
 * Usamos los ciclos de didmoun y willunmount para poder usar el componente que ya existe
 * de forma global (en App.tsx) sin crearlo de nuevo. Asi podemos usarlo como componente
 * declarandolo donde necesitemos o usar directamente el SpinnerStateContainer.
 */
export class SpinnerGlobalScreen extends React.Component<IProps, IState> {
  spinnerSC?: SpinnerGlobalStateContainer;

  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    this.spinnerSC && await this.spinnerSC.setState({ texto: this.props.mensaje || 'Cargando...', isVisible: true });
  }

  async componentWillUnmount() {
    this.spinnerSC && await this.spinnerSC.hide();
  }

  public render() {
    return (
      <Subscribe to={[SpinnerGlobalStateContainer]}>
        {
          (spinnerSC: SpinnerGlobalStateContainer) => {
            this.spinnerSC = spinnerSC;
            return null;
          }
        }
      </Subscribe>
    );
  }
}