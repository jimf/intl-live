import test from 'tape';
import * as visitors from '../../src/compiler/visitors';

test('visitors.messageVariablesVisitor', t => {
    const subject = visitors.messageVariablesVisitor();

    t.deepEqual(subject.getVariables(), []);

    subject.argumentElement({ id: 'foo' });
    subject.argumentElement({ id: 'bar' });
    subject.argumentElement({ id: 'baz' });

    t.deepEqual(subject.getVariables(), ['foo', 'bar', 'baz']);

    t.end();
});
