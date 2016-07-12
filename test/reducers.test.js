import test from 'tape';
import * as actions from '../src/actions';
import subject from '../src/reducers';

test('reducers - initial state', t => {
    t.deepEqual(subject(undefined, {}), {
        message: '',
        renderLocale: 'en-US',
        locales: [
            'cs-CZ',
            'en-US',
            'es-AR',
            'fr-FR',
            'ja-JP',
            'pt-BR'
        ]
    });
    t.end();
});

test('reducers - SET_MESSAGE', t => {
    const state = subject(undefined, {});
    t.deepEqual(subject(state, actions.setMessage('foo')).message, 'foo',
        'updates `message` state');
    t.end();
});
