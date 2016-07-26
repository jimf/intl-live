import test from 'tape';
import * as actions from '../src/actions';
import subject from '../src/reducers';

test('reducers - initial state', t => {
    t.deepEqual(subject(undefined, {}), {
        message: '',
        htmlMessage: '',
        context: {},
        formats: '{}',
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
    const newState = subject(state, actions.setMessage({
        text: 'foo',
        html: '<div>foo</div>'
    }));
    t.equal(newState.message, 'foo', 'updates `message` state');
    t.equal(newState.htmlMessage, '<div>foo</div>',
        'updates `htmlMessage` state');
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

test('reducers - SET_FORMATS', t => {
    const state = subject(
        subject(undefined, {}),
        actions.setFormats('{ "number": {} }')
    );
    t.equal(state.formats, '{ "number": {} }', 'updates `formats` state');
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
