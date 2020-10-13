import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../../store/store";


import StreamComponent from '../../../components/room/stream/StreamComponent';

describe('Stream', () => {
  let component = null;

  //초기 렌더링이 문제없이 되는지
  it('renders correctly', () => {
    component = renderer.create(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StreamComponent />
            </PersistGate>
        </Provider>
        );
  });

  //초기 렌더링 스냅샷과 일치하는지
  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});