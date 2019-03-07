import { estilosDeEmpresa as estilosDeEmpresaSeleccionada } from '../../estilosDeEmpresa';
import { merge } from '../utils/merge';
import { IEstilosDeEmpresa, IDefecto } from './estilosDeEmpresaTypes';

const defecto: IDefecto = merge({
  colorPrimario: '#009035',
  colorContrastePrimario: 'white',
  colorError: '#e91e63',
  screen: {
    colores: {
      fondo: '#ffffff', // #f2f2f2
      // Estos en funcion de fondo
      note: '#9C8486', // #757575
      contraste: '#7E6F70', // #4c4c4c
      disabled: '#4c4c4c'
    }
  },
  // El color sera por defecto el contraste del screen, despues dependera de donde se lo este usando
  texto: {
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: 15
  }
} as IDefecto, estilosDeEmpresaSeleccionada.defecto || {});

export const estilosDeEmpresa: IEstilosDeEmpresa = merge({
  defecto,
  componentes: {
    statusBar: {
      barStyle: 'light-content',
      bgColor: defecto.colorPrimario,
      showHideTransition: 'slide'
    },
    input: {
      normal: {
        oscioso: {
          normal: {
            colores: {
              fondo: '#f8f8f8',
              contraste: '#4a4a4a',
              borde: '#f8f8f8',
              placeholder: '#757575',
              seleccion: 'gray'
            }
          },
          seleccionado: {
            colores: {
              fondo: 'white',
              contraste: '#4a4a4a',
              borde: '#e6e6e6',
              placeholder: '#757575',
              seleccion: 'gray'
            }
          },
          deshabilitado: {
            colores: {
              fondo: '#e6e6e6',
              contraste: '#222222',
              borde: '#e6e6e6',
              placeholder: '#757575',
              seleccion: 'gray'
            }
          }
        },
        error: {
          normal: {
            colores: {
              fondo: '#f8f8f8',
              contraste: '#4a4a4a',
              borde: defecto.colorError,
              placeholder: '#757575',
              seleccion: 'gray'
            }
          },
          seleccionado: {
            colores: {
              fondo: 'white',
              contraste: '#4a4a4a',
              borde: defecto.colorError,
              placeholder: '#757575',
              seleccion: 'gray'
            }
          },
          deshabilitado: {
            colores: {
              fondo: '#e6e6e6',
              contraste: '#222222',
              borde: '#e6e6e6',
              placeholder: '#757575',
              seleccion: 'gray'
            }
          }
        },
        exito: {
          normal: {
            colores: {
              fondo: '#f8f8f8',
              contraste: '#4a4a4a',
              borde: defecto.colorPrimario,
              placeholder: '#757575',
              seleccion: 'gray'
            }
          },
          seleccionado: {
            colores: {
              fondo: 'white',
              contraste: '#4a4a4a',
              borde: defecto.colorPrimario,
              placeholder: '#757575',
              seleccion: 'gray'
            }
          },
          deshabilitado: {
            colores: {
              fondo: '#e6e6e6',
              contraste: '#222222',
              borde: '#e6e6e6',
              placeholder: '#757575',
              seleccion: 'gray'
            }
          }
        },
      }
    },
    button: {
      normal: {
        oscioso: {
          normal: {
            colores: {
              fondo: defecto.colorPrimario,
              contraste: defecto.colorContrastePrimario,
              borde: defecto.colorPrimario
            }
          },
          deshabilitado: {
            colores: {
              fondo: 'gray',
              contraste: 'white',
              borde: 'gray'
            }
          }
        }
      },
      outline: {
        oscioso: {
          normal: {
            colores: {
              fondo: 'transparent',
              contraste: defecto.colorPrimario,
              borde: defecto.colorPrimario
            }
          },
          deshabilitado: {
            colores: {
              fondo: 'transparent',
              contraste: 'gray',
              borde: 'gray'
            }
          }
        }
      }
    },
    card: {
      normal: {
        colores: {
          fondo: '#f2f2f2',
          contraste: defecto.screen.colores.contraste,
          note: defecto.screen.colores.note,
          separador: '#eeeeee'
        }
      }
    },
    marcadorMapa: {
      colores: {
        bgColor: defecto.colorPrimario,
        color: defecto.colorContrastePrimario
      }
    }
  },
} as IEstilosDeEmpresa, estilosDeEmpresaSeleccionada);

  // stepIndicator: {
  //   stepIndicatorSize: 25,
  //   currentStepIndicatorSize: 30,
  //   separatorStrokeWidth: 2,
  //   currentStepStrokeWidth: 3,
  //   stepStrokeCurrentColor: '#009035',
  //   stepStrokeWidth: 3,
  //   stepStrokeFinishedColor: '#009035',
  //   stepStrokeUnFinishedColor: '#757575',
  //   separatorFinishedColor: '#009035',
  //   separatorUnFinishedColor: '#757575',
  //   stepIndicatorFinishedColor: '#009035',
  //   stepIndicatorUnFinishedColor: '#757575',
  //   stepIndicatorCurrentColor: '#ffffff',
  //   stepIndicatorLabelFontSize: 0, // 13
  //   currentStepIndicatorLabelFontSize: 0,
  //   stepIndicatorLabelCurrentColor: '#009035',
  //   stepIndicatorLabelFinishedColor: '#ffffff',
  //   stepIndicatorLabelUnFinishedColor: '#757575',
  //   labelColor: '#757575',
  //   labelSize: 10,
  //   labelFontFamily: 'SFUIDisplay-Regular',
  //   stepIndicatorLabelFontFamily: 'SFUIDisplay-Regular',
  //   currentStepLabelColor: '#009035',
  // },