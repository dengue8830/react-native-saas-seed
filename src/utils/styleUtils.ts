/**
 * BUG: En ios no indicar un color en ActivityIndicator
 * resulta en un #99999 por defecto. Esto jode nuestro theming en Button.tsx
 * e Input.tsx.
 * FIX: Usar un string defecto para indicar que no hay color.
 */
export const SIN_COLOR = 'sin-color';

export const StyleUtils = {
  existeColor: (color?: string) => {
    if (color === SIN_COLOR) {
      return false;
    }
    return !!color;
  }
}