import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import debounce from 'lodash.debounce';
import appReducer, { setStateFromSerialized, selectors } from './state';
import AppContainer from './containers/app';

const store = createStore(appReducer);

if (location.hash && location.hash !== '#') {
    store.dispatch(setStateFromSerialized(location.hash.slice(1)));
}

store.subscribe(debounce(() => {
    const hash = selectors.getSerialized(store.getState());
    window.history.pushState(null, null, `#${hash}`);
}, 500))

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);
