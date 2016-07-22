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

test('selectors - rendered', t => {
    const cases = [
        {
            state: {
                message: 'Hello world',
                renderedLocale: 'en-US'
            },
            expected: 'Hello world'
        },
        {
            state: {
                message: 'Hello {name}',
                context: { name: 'Jim' },
                renderedLocale: 'en-US'
            },
            expected: 'Hello Jim'
        },
        {
            state: {
                message: '{this is a SyntaxError}',
            },
            expected: 'SyntaxError: Expected "," or "}" but "i" found.'
        }
    ];

    cases.forEach(testcase => {
        t.deepEqual(subject.rendered(testcase.state), testcase.expected);
    });

    t.end();
});
