import test from 'tape';
import * as subject from '../src/selectors';

test('selectors - variableNames', t => {
    const cases = [
        {
            state: {
                message: 'Hello world'
            },
            expected: []
        },
        {
            state: {
                message: 'Hello, {name}'
            },
            expected: ['name']
        },
        {
            state: {
                message: '{this is a SyntaxError}'
            },
            expected: []
        },
        {
            state: {
                message: '{count} {count, plural, one {item} other {items} }'
            },
            expected: ['count']
        }
    ];

    cases.forEach(testcase => {
        t.deepEqual(subject.variableNames(testcase.state), testcase.expected);
    });

    t.end();
});

test('selectors - variables', t => {
    const cases = [
        {
            state: {
                message: 'Hello world'
            },
            expected: []
        },
        {
            state: {
                message: 'Hello, {name}'
            },
            expected: [['name', null]]
        },
        {
            state: {
                message: '{this is a SyntaxError}'
            },
            expected: []
        },
        {
            state: {
                message: '{count} {count, plural, one {item} other {items} }'
            },
            expected: [['count', 'pluralFormat']]
        }
    ];

    cases.forEach(testcase => {
        t.deepEqual(subject.variables(testcase.state), testcase.expected);
    });

    t.end();
});

test('selectors - rendered', t => {
    const cases = [
        {
            state: {
                message: 'Hello world',
                formats: '{}',
                renderedLocale: 'en-US'
            },
            expected: 'Hello world'
        },
        {
            state: {
                message: 'Hello {name}',
                context: { name: 'Jim' },
                formats: '{}',
                renderedLocale: 'en-US'
            },
            expected: 'Hello Jim'
        },
        {
            state: {
                message: '{this is a SyntaxError}',
                formats: '{}'
            },
            expected: 'SyntaxError: Expected "," or "}" but "i" found.'
        },
        {
            state: {
                message: 'I have {money, number, usd}',
                context: { money: '5' },
                formats: `{
                    "number": {
                        "usd": { "style": "currency", "currency": "USD" }
                    }
                }`,
                renderedLocale: 'en-US'
            },
            expected: 'I have $5.00'
        },
        {
            state: {
                message: 'I have {money, number, usd}',
                context: { money: '5' },
                formats: 'this is a SyntaxError',
                renderedLocale: 'en-US'
            },
            expected: 'Formats: SyntaxError: Unexpected token h'
        },
    ];

    cases.forEach(testcase => {
        t.deepEqual(subject.rendered(testcase.state), testcase.expected);
    });

    t.end();
});
