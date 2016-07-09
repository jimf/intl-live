import 'babel-polyfill';
import R from 'ramda';
import { createFactory } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import AppContainer from './containers/app';

const provider = createFactory(Provider);
const appContainer = createFactory(AppContainer);

render(
    provider({
        store: R.tap(store => { window.app = { store }; },
                     createStore(appReducer))
    }, appContainer()),
    document.getElementById('app')
);
