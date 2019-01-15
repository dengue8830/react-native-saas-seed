/**
 * Errores posibles en la app. Tanto de logica de negocio como runtime.
 * El objetivo es poder tratarlo de forma limpia e uniforme al estilo
 * switch(error.message) { case Errores.Desconocido: ... };
 * y que sirva para cualquier error posible, red, custom, etc.
 */
export enum Errores {
  /** Usado en parseo de los modelos de la logica de negocio. */
  Parse = 'parse-error-not-null-safe',
  NoAutorizado = 'no-autorizado',
  NoAutenticado = 'no-autenticado',
  Desconocido = 'unknown'
}

/**
 * Clase que representa un error extendido para
 * incluir datos extras.
 * Se usa como base para otros tipos de errores
 * y tambien para usarlo directamente.
 */
export class ErrorBase extends Error {
  /**
   * Cualquier dato extra que pueda servir para debuggear el error.
   * Es un campo auxiliar para cosas pequenas y rapidas que se enviara
   * al server para reportar el error.
   * Para estructuras mas complejas, rigidas o extensas que no sean necesarias
   * ser enviadas al server, crear un nuevo tipo de error
   * que extienda de este y le de un tipo a extra o cree un nuevo atributo.
   * Ej: un HttpError con attrs response y request que se carguen en el
   * catch de la llamada http.
   */
  extra?: any;
  /** Codigo legible para el usuario. hri: human readable id */
  codigo?: string;

  constructor(mensaje: string, extra?: any, codigo?: string) {
    super(mensaje);
    this.extra = extra;
    this.codigo = codigo;
    // Esto quita este constructor del stacktrace pero solo esta disponible en node, no browsers
    Error.captureStackTrace(this, ErrorBase);
  }
}