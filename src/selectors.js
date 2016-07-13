import R from 'ramda';
import { createSelector } from 'reselect';
import IntlMessageFormat from 'intl-messageformat';
import { parse } from 'intl-messageformat-parser';
import { traverser } from './compiler';
import { messageVariablesVisitor } from './compiler/visitors';

const getMessage = R.prop('message');
const getLocale = R.prop('renderLocale');
const getContext = R.prop('context');

/**
 * Extract variable names from current message.
 */
export const variables = createSelector(
    getMessage,
    message => {
        const visitor = messageVariablesVisitor();

        try {
            traverser(parse(message), visitor);
            return R.uniq(visitor.getVariables());
        } catch (err) {
            return [];
        }
    }
);

/**
 * Format the current message/locale combination.
 */
export const rendered = createSelector(
    [getMessage, getLocale, getContext],
    (message, locale, context) => {
        try {
            const intl = new IntlMessageFormat(message, locale);
            return intl.format(context);
        } catch (err) {
            return err.toString();
        }
    }
);
