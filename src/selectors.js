import R from 'ramda';
import { createSelector } from 'reselect';
import IntlMessageFormat from 'intl-messageformat';
import { parse } from 'intl-messageformat-parser';
import { traverser } from './compiler';
import { messageVariablesVisitor } from './compiler/visitors';

const getMessage = R.prop('message');
const getLocale = R.prop('renderLocale');

/**
 * Extract variable names from current message.
 */
export const variables = createSelector(
    getMessage,
    message => {
        const visitor = messageVariablesVisitor();

        try {
            traverser(parse(message), visitor);
            return visitor.getVariables();
        } catch (err) {
            return [];
        }
    }
);

/**
 * Format the current message/locale combination.
 */
export const rendered = createSelector(
    [getMessage, getLocale],
    (message, locale) => {
        try {
            const intl = new IntlMessageFormat(message, locale);
            return intl.format({});
        } catch (err) {
            return err.toString();
        }
    }
);
