import test from 'tape';
import * as visitors from '../../src/compiler/visitors';

test('visitors.messageVariablesVisitor', t => {
    const subject = visitors.messageVariablesVisitor();

    t.deepEqual(subject.getVariables(), []);

    subject.argumentElement({ id: 'foo', format: { type: 'dummyType'} });
    subject.argumentElement({ id: 'bar' });
    subject.argumentElement({ id: 'baz' });

    t.deepEqual(subject.getVariables(), [
        { name: 'foo', type: 'dummyType' },
        { name: 'bar', type: null },
        { name: 'baz', type: null }
    ]);

    t.end();
});
