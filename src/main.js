import 'babel-polyfill';
import R from 'ramda';
import { createFactory } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Quill } from 'react-quill';
import appReducer from './state';
import AppContainer from './containers/app';
import intlToolbar from './quill.intl-toolbar';

Quill.registerModule('intlToolbar', intlToolbar(document));
const provider = createFactory(Provider);
const appContainer = createFactory(AppContainer);

render(
    provider({
        store: R.tap(store => { window.app = { store }; },
                     createStore(appReducer))
    }, appContainer()),
    document.getElementById('app')
);
