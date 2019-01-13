import { CConfig } from '../utils/config';

const SERVER_URL = CConfig.getServerUrl();

export const APIs = {
  LOGIN: `${SERVER_URL}/apis/auth/login/app/v1`,
  REGISTRO: `${SERVER_URL}/apis/auth/signup/v2`,
  CHECK_TOKEN: `${SERVER_URL}/apis/auth/checkToken/v1`,
  CHECK_SERVER_STATUS: `${SERVER_URL}/apis/utils/checkServerStatus/v1`,
  TOKEN_INVITADO: `${SERVER_URL}/apis/auth/tokenInvitado/v1`,
  REPORTAR_ERROR: `${SERVER_URL}/apis/errorLogs/reportarError/v1`,
  CERRAR_SESION: `${SERVER_URL}/apis/auth/logout/v1`,
  ACTUALIZAR_POSICION: `${SERVER_URL}/apis/actualizarPosicion/v1`
}

export const FIREBASE = {
  ANDROID_CHANNEL: 'reactnativesaasseed'
}