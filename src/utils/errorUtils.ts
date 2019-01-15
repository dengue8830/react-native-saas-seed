import { Component } from 'react';

export const ErrorUtil = {
  extraerInfoDeComponente: (componente: Component) => {
    return { state: componente.state, props: componente.props };
  }
}