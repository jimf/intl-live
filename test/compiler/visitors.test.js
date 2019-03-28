import * as visitors from '../../src/compiler/visitors';

describe('Compiler visitors', () => {
    test('messageVariablesVisitor', () => {
        const subject = visitors.messageVariablesVisitor();

        expect(subject.getVariables()).toEqual([]);

        subject.argumentElement({ id: 'foo', format: { type: 'dummyType'} });
        subject.argumentElement({ id: 'bar' });
        subject.argumentElement({ id: 'baz' });

        expect(subject.getVariables()).toEqual([
            { name: 'foo', type: 'dummyType' },
            { name: 'bar', type: null },
            { name: 'baz', type: null }
        ]);
    });
});
