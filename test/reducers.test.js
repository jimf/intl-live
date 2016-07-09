import test from 'tape';
import subject from '../src/reducers';

test('reducers - initial state', t => {
    t.deepEqual(subject(undefined, {}), {});
    t.end();
});
