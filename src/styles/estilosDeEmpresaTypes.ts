export interface IColorButton {
  fondo: string,
  contraste: string,
  borde: string
};

export interface IThemeButton {
  normal: {
    oscioso: {
      normal: {
        colores: IColorButton
      },
      deshabilitado: {
        colores: IColorButton
      }
    }
  },
  outline: {
    oscioso: {
      normal: {
        colores: IColorButton
      },
      deshabilitado: {
        colores: IColorButton
      }
    }
  }
}

export interface IThemeInput {
  normal: {
    oscioso: {
      normal: {
        colores: IColorInput
      },
      seleccionado: {
        colores: IColorInput
      },
      deshabilitado: {
        colores: IColorInput
      }
    },
    error: {
      normal: {
        colores: IColorInput
      },
      seleccionado: {
        colores: IColorInput
      },
      deshabilitado: {
        colores: IColorInput
      }
    },
    exito: {
      normal: {
        colores: IColorInput
      },
      seleccionado: {
        colores: IColorInput
      },
      deshabilitado: {
        colores: IColorInput
      }
    }
  }
}

export interface IColorInput {
  fondo: string,
  contraste: string,
  borde: string,
  placeholder: string,
  seleccion: string
}

export interface IDefecto {
  colorPrimario: string,
  colorContrastePrimario: string,
  colorError: string,
  screen: {
    colores: {
      fondo: string,
      note: string,
      contraste: string,
      disabled: string
    }
  },
  texto: {
    fontFamily: string,
    fontSize: number
  }
}

interface IStatusBar {
  barStyle: string;
  bgColor: string;
  showHideTransition: string;
}

interface IComponentes {
  statusBar: IStatusBar,
  input: IThemeInput,
  button: IThemeButton,
  card: {
    normal: {
      colores: {
        fondo: string,
        contraste: string,
        note: string,
        separador: string
      }
    }
  },
  marcadorMapa: {
    colores: {
      bgColor: string,
      color: string
    }
  }
}

export interface IEstilosDeEmpresa {
  defecto: IDefecto;
  componentes: IComponentes;
}