import R from 'ramda';
import * as actions from './actions';

const initialState = () => ({
    message: '',
    context: {},
    renderLocale: 'en-US',
    locales: [
        'cs-CZ',
        'en-US',
        'es-AR',
        'fr-FR',
        'ja-JP',
        'pt-BR'
    ]
});

const reducers = {};

reducers[actions.SET_MESSAGE] = (state, { payload }) => (
    R.assoc('message', payload, state)
);

reducers[actions.SET_CONTEXT_VALUE] = (state, { payload }) => (
    R.evolve({ context: R.flip(R.merge)(payload) })(state)
);

reducers[actions.SET_RENDER_LOCALE] = (state, { payload }) => (
    R.assoc('renderLocale', payload, state)
);

const appReducer = (state = initialState(), action) => ( /*jshint ignore:line*/
    action.type in reducers
        ? reducers[action.type](state, action)
        : state
);

export default appReducer;
