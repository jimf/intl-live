import test from 'tape';
import * as subject from '../src/util';

test('util.withValue', t => {
    t.plan(1);
    const e = { target: { value: 'dummy' } };
    subject.withValue(value => {
        t.equal(value, 'dummy',
            'calls function with target.value from event');
    })(e);
    t.end();
});

test('util.parseDateString', t => {
    t.equal(subject.parseDateString('junk'), undefined,
        'returns undefined for invalid input');

    t.equal(
        subject.parseDateString('1996-12-31'),
        (new Date(1996, 11, 31)).getTime(),
        'returns ms since epoch for dates'
    );

    t.end();
});

test('util.parseTimeString', t => {
    t.equal(subject.parseTimeString('junk'), undefined,
        'returns undefined for invalid input');

    const now = new Date();
    t.equal(
        subject.parseTimeString('15:31'),
        (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 31))
            .getTime(),
        'returns ms since epoch for times'
    );

    t.end();
});
