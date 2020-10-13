import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../../store/store";


import ConfigComponent from '../../../components/config/ConfigComponent';

describe('Config', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigComponent />
            </PersistGate>
        </Provider>
        );
  });

  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});