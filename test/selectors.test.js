import test from 'tape';
import * as subject from '../src/selectors';

test('selectors - variables', t => {
    const cases = [
        {
            state: {
                message: 'Hello world',
            },
            expected: []
        },
        {
            state: {
                message: 'Hello, {name}',
            },
            expected: ['name']
        },
        {
            state: {
                message: '{this is a SyntaxError}',
            },
            expected: []
        }
    ];

    cases.forEach(testcase => {
        t.deepEqual(subject.variables(testcase.state), testcase.expected);
    });

    t.end();
});
