import R from 'ramda';
import * as actions from './actions';

const initialState = () => ({
    message: ''
});

const reducers = {};

reducers[actions.SET_MESSAGE] = (state, { payload }) => (
    R.assoc('message', payload, state)
);

const appReducer = (state = initialState(), action) => ( /*jshint ignore:line*/
    action.type in reducers
        ? reducers[action.type](state, action)
        : state
);

export default appReducer;
