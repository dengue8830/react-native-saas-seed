import { Component } from 'react';

// TODO: determinar como manejaremos los erores, debe ser genial XD
export enum Errores {
  /** No se puede parsear undefined|null. Escribe funciones de parse nullsafe. */
  Parse = 'parse-error-not-null-safe',
  NoTieneTaxiAsignado = 'no-tiene-taxi-asignado',
  NoTieneSesion = 'no-tiene-sesion',
  FueraAreaCobertura = 'fuera-area-cobertura',
  NoHayChoferesDisponibles = 'no-hay-choferes-disponibles',
  YaNoSePuedeEditar = 'ya-no-se-puede-editar'
}

/**
 * Clase que representa un error extendido para
 * incluir datos extras.
 * Se usa como base para otros tipos de errores y tambien para usarlo directamente.
 */
export class ErrorExtra extends Error {
  extra?: string;

  constructor(mensaje: string, extra?: any) {
    super(mensaje);
    this.extra = extra ? JSON.stringify(extra) : undefined;
    // Esto quita este constructor del stacktrace pero solo esta disponible en node, no browsers
    Error.captureStackTrace(this, ErrorExtra);
  }
}

/**
 * Representa un error de navegacion;
 */
export class ErrorNavegacion extends ErrorExtra {

  constructor(mensaje: string = '', extra?: any) {
    super(mensaje, extra);
    // Esto quita este constructor del stacktrace pero solo esta disponible en node, no browsers
    Error.captureStackTrace(this, ErrorExtra);
  }
}

/**
 * Un tipo de error que sabe extraer los datos valiosos de un componente de react
 */
export class ErrorReactComponent extends ErrorExtra {

  static extraerInfoDeComponente(componente: Component) {
    return { state: componente.state, props: componente.props };
  }

  constructor(mensaje: string, componente: Component, extra?: any) {
    super(mensaje);
    this.extra = JSON.stringify({ extra, ...ErrorReactComponent.extraerInfoDeComponente(componente) });
    // Esto quita este constructor del stacktrace pero solo esta disponible en node, no browsers
    Error.captureStackTrace(this, ErrorReactComponent);
  }
}