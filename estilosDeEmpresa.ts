import { IEstilosDeEmpresa } from '@estilosDeEmpresaTypes';

// Para que el path de import funcione al copiar del directorio de empresas y pegar en root
// usar alias de babel (https://github.com/emin93/react-native-template-typescript/issues/23#issuecomment-430462223)
// o simplemente usarlo para checkear que esta bien el json y luego volver a comentarlo

export const estilosDeEmpresa = {
  defecto: {
    colorPrimario: '#009035'
  }
} as IEstilosDeEmpresa;