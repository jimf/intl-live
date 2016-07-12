import test from 'tape';
import * as subject from '../src/actions';

test('actions - SET_MESSAGE', t => {
    t.equal(subject.SET_MESSAGE, 'SET_MESSAGE');
    t.deepEqual(subject.setMessage('dummy'), {
        type: subject.SET_MESSAGE,
        payload: 'dummy'
    });
    t.end();
});

test('actions - SET_RENDER_LOCALE', t => {
    t.equal(subject.SET_RENDER_LOCALE, 'SET_RENDER_LOCALE');
    t.deepEqual(subject.setRenderLocale('dummy'), {
        type: subject.SET_RENDER_LOCALE,
        payload: 'dummy'
    });
    t.end();
});
