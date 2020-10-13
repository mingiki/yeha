import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../../store/store";


import ToolbarComponent from '../../../components/room/toolbar/ToolbarComponent';

describe('Toolbar', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ToolbarComponent />
            </PersistGate>
        </Provider>
        );
  });

  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});