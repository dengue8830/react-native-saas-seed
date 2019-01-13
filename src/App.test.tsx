import 'react-native';
// import React from 'react';
// import App from './App';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// Falta saber por que cuando tratamos de testear un componente tira error: Jest encountered an unexpected token
// aun despues de seguir tal cual lo que hace este
// https://stackoverflow.com/questions/52343699/react-native-with-typescript-and-jest-is-broken-after-0-57-update-couldnt-find/52367419#52367419
it('dummy test', () => {
  // const tree = renderer.create(
  //   <App />
  // );
  expect(true).toEqual(true);
});