import test from 'tape';
import * as actions from '../src/actions';
import subject from '../src/reducers';

test('reducers - initial state', t => {
    t.deepEqual(subject(undefined, {}), {
        message: '',
        context: {},
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

test('reducers - SET_CONTEXT_VALUE', t => {
    const state = subject(
        subject(undefined, {}),
        actions.setContextValue({ foo: 'bar' })
    );
    t.deepEqual(state.context, { foo: 'bar' }, 'updates `context` state');
    t.end();
});

test('reducers - SET_RENDER_LOCALE', t => {
    const state = subject(
        subject(undefined, {}),
        actions.setRenderLocale('fr-FR')
    );
    t.deepEqual(state.renderLocale, 'fr-FR', 'updates `renderLocale` state');
    t.end();
});
