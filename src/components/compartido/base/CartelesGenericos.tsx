/**
 * Estos componentes son para reutilizar los mensajes de pantalla completa mas comunes,
 * para algo muy particular no complejizarlos, crea tu propio componente.
 */
import React from 'react';
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import { Text } from './Text';
import { TouchableIcon } from './TouchableIcon';
import { Icon } from './Icon';
import { estilosDeEmpresa } from '../../../styles/estilosDeEmpresa';

interface ICartelContainerProps {
  children?: any;
}

interface ICartelGenericoProps {
  imgRequire?: any;
  imgElement?: JSX.Element;
  imgIconName?: string;
  texto?: string;
  children?: any;
}

/**
 * Wrapper de Mensaje que le da estilos de pantalla completa
 */
export function CartelContainer(props: ICartelContainerProps) {
  return (
    // <View style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {props.children}
      </View>
    </View >
  );
}

/**
 * Generador de mensaje generico que se compone de una imagen y un texto.
 * @param props 
 */
export function CartelGenerico(props: ICartelGenericoProps) {
  return (
    <CartelContainer>
      {
        !!props.imgRequire &&
        <Image source={props.imgRequire} style={{ height: 70, width: 70 }} />
      }
      {
        props.imgElement
      }
      {
        !!props.imgIconName &&
        <Icon name={props.imgIconName} size={40} color={estilosDeEmpresa.defecto.screen.colores.note} />
      }
      {
        props.texto &&
        <Text
          textStyle={{
            textAlign: 'center',
            color: estilosDeEmpresa.defecto.screen.colores.note,
            padding: 15,
            fontSize: 20
          }}
        >
          {props.texto}
        </Text>
      }
      {
        props.children
      }
    </CartelContainer>
  );
}

/** True cuando no se paso ninguna imagen al mensaje generico. Usada para decidir si usar una imagen por defecto. */
// function noTieneImagen(props: IMensajeGenericoProps): boolean {
//   return !props.imgElement && !props.imgRequire && (!!props.imgIconName || props.imgIconName !== '');
// }

/**
 * Generador de mensaje "vacio"
 * @param props 
 */
export function CartelVacio(props: ICartelGenericoProps) {
  // const imgIconName = noTieneImagen(props) ? 'ios-filing-outline' : props.imgIconName;
  const imgIconName = 'ios-filing-outline';
  const texto = props.texto || 'Sin resultados';
  return CartelGenerico({ ...props, texto, imgIconName });
}

/**
 * Generador de mensaje "cargando"
 * @param props 
 */
export function CartelCargando(props: ICartelGenericoProps) {
  // const imgElement = noTieneImagen(props) ? <ActivityIndicator color='#757575' size='small' /> : props.imgElement;
  const imgElement = <ActivityIndicator color={estilosDeEmpresa.defecto.screen.colores.note} size='large' />;
  const texto = props.texto || 'Espere...';
  return CartelGenerico({ ...props, texto, imgElement });
}

/**
 * Generador de mensaje "error"
 * @param props 
 */
export function CartelError(props: ICartelGenericoProps) {
  // const imgIconName = noTieneImagen(props) ? 'ios-bug' : props.imgIconName;
  const imgIconName = 'ios-bug';
  const texto = props.texto || 'Ups! se produjo un error, inténtalo de nuevo';
  return CartelGenerico({ ...props, texto, imgIconName });
}

// export function CartelAbsoluto(props: { children: any }) {
//   return (
//     <View style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     }}>{props.children}</View>
//   );
// }
