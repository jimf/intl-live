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
 * Extract variable names and types from current message.
 */
export const variables = createSelector(
    getMessage,
    message => {
        const visitor = messageVariablesVisitor();

        try {
            traverser(parse(message), visitor);
        } catch (err) {
            return [];
        }

        return R.toPairs(
            visitor.getVariables().reduce((acc, variable) => (
                Object.assign(acc, {
                    [variable.name]: acc[variable.name] || variable.type
                })
            ), {})
        );
    }
);

/**
 * Extract variable names from current message.
 */
export const variableNames = createSelector(
    variables,
    R.map(R.head)
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
