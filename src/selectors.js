import R from 'ramda';
import { createSelector } from 'reselect';
import { parse } from 'intl-messageformat-parser';
import { traverser } from './compiler';
import { messageVariablesVisitor } from './compiler/visitors';

const getMessage = R.prop('message');

export const variables = createSelector(
    getMessage,
    message => {
        const visitor = messageVariablesVisitor();

        try {
            traverser(parse(message), visitor);
            return visitor.getVariables();
        } catch(err) {
            return [];
        }
    }
);
