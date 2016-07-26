import R from 'ramda';
import { createSelector } from 'reselect';
import IntlMessageFormat from 'intl-messageformat';
import { parse } from 'intl-messageformat-parser';
import { traverser } from './compiler';
import { messageVariablesVisitor } from './compiler/visitors';
import { parseDateString, parseTimeString } from './util';

const getMessage = R.prop('message');
const getLocale = R.prop('renderLocale');
const getContext = R.prop('context');
const getFormats = R.prop('formats');

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

const contextTransform = {
    dateFormat: parseDateString,
    timeFormat: parseTimeString,
    numberFormat: R.defaultTo(0),
    pluralFormat: R.defaultTo(0)
};

const computeContext = (variables, context) => (
    variables.reduce((acc, [name, type]) => {
        if (type === null && context[name] === undefined) {
            return acc;
        }

        const transform = contextTransform[type] || R.identity;
        return Object.assign(acc, { [name]: transform(context[name]) });
    }, {})
);

/**
 * Format the current message/locale combination.
 */
export const rendered = createSelector(
    [getMessage, getLocale, getContext, getFormats, variables],
    (message, locale, context, formats, variables) => {
        let parsedFormats;
        try {
            parsedFormats = JSON.parse(formats);
        } catch (err) {
            return `Formats: ${err.toString()}`;
        }

        try {
            const intl = new IntlMessageFormat(message, locale, parsedFormats);
            return intl.format(computeContext(variables, context));
        } catch (err) {
            return err.toString();
        }
    }
);
