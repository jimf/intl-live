import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './state';
import AppContainer from './containers/app';

const store = createStore(appReducer);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);
