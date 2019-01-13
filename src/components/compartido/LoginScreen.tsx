import * as React from 'react';
import { Content } from 'native-base';
import { View, BackHandler } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { loginService } from '../../utils/loginService';
import { Formik, FormikActions } from 'formik';
import { ValidatorUtil } from '../../utils/validator';
import { estilosDeEmpresa } from '../../styles/estilosDeEmpresa';
import { Container } from './base/Container';
import { Input } from './base/Input';
import { Text } from './base/Text';
import { Button } from './base/Button';
import { Icon } from './base/Icon';
import { TouchableIcon } from './base/TouchableIcon';
import { toastService } from '../../utils/toastService';

interface IProps extends RouteComponentProps {
}

interface IState {
}

const paddingLateral = 40;

type Campos = { username: string, pass: string };

export class LoginScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegistro = this.onPressRegistro.bind(this);
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

  async onPressLogin(values: Campos, actions: FormikActions<Campos>) {
    if (ValidatorUtil.isEmpty(values.username) || ValidatorUtil.isEmpty(values.pass)) {
      actions.setErrors({
        username: ValidatorUtil.isEmpty(values.username) ? 'Ingresa tu usuario' : undefined,
        pass: ValidatorUtil.isEmpty(values.pass) ? 'Ingresa tu contraseña' : undefined,
      });
      actions.setSubmitting(false);
      return;
    }
    try {
      const loginData = await loginService.login(values.username, values.pass);
      // loginService.afterLogin(loginData.token!, loginData.sesion!, this.props.history);
      loginService.afterLogin('faketoken', { usuario: { id: '', isInvitado: true } }, this.props.history);
      toastService.show();
    } catch (error) {
      if (error.message === 'credenciales') {
        actions.setStatus('Usuario o contraseña incorrectos');
        actions.setSubmitting(false);
      } else {
        actions.setStatus('Ups! intenta de nuevo');
        actions.setSubmitting(false);
      }
      actions.setStatus('Ups! intenta de nuevo');
      actions.setSubmitting(false);
    }
  }

  onPressRegistro() {
  }

  public render() {
    return (
      <Container>
        <Content style={{ paddingLeft: paddingLateral, paddingRight: paddingLateral }}>
          <Text textStyle={{ marginTop: 60, marginBottom: 30, fontSize: 40 }}>Bienvenido</Text>
          <Formik
            initialValues={{ username: '', pass: '' } as Campos}
            onSubmit={this.onPressLogin}
          >
            {props => (
              <React.Fragment>
                {/* Para hacer tab al siguiente input https://thekevinscott.com/tabbing-through-input-fields/ */}
                <Input
                  containerStyle={{ marginTop: 20, marginBottom: 0 }}
                  placeholder='Usuario'
                  leftIcon={<Icon name='ios-person-outline' />}
                  onChangeText={props.handleChange('username')}
                  value={props.values.username}
                  isError={!!props.errors.username}
                  isDisabled={props.isSubmitting}
                />
                <Input
                  containerStyle={{ marginTop: 10 }}
                  placeholder='Contraseña'
                  isSecureTextEntry={true}
                  leftIcon={<TouchableIcon name='ios-lock-outline' />}
                  onChangeText={props.handleChange('pass')}
                  value={props.values.pass}
                  isError={!!props.errors.pass}
                  isDisabled={props.isSubmitting}
                />
                {
                  props.status &&
                  <Text
                    textStyle={{ alignSelf: 'center' }}
                    color={estilosDeEmpresa.defecto.colorError}>
                    {props.status}
                  </Text>
                }
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Text onPress={this.onPressRegistro} textStyle={{ fontSize: 14 }} isNote={true}>
                    ¿No tienes cuenta? <Text>Regístrate</Text>
                  </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Button
                    isBlock={true}
                    onPress={props.handleSubmit}
                    center={<Text textStyle={{ fontSize: 16 }}>INGRESAR</Text>}
                    right={<Icon name='ios-arrow-forward' />}
                    isLoading={props.isSubmitting}
                    isDisabled={props.isSubmitting}
                  />
                </View>
                {/* TODO: Login con facebook */}
                {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Text textStyle={{ color: '#757575' }}> o </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <TouchableIcon
                    name='logo-facebook'
                    onPress={() => { }}
                    iconStyle={{ color: '#4267B2', fontSize: 50 }}
                  />
                </View> */}
              </React.Fragment>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}