import * as actions from '../src/actions';
import subject from '../src/reducers';

describe('Reducers', () => {
    test('initial state', () => {
        expect(subject(undefined, {})).toEqual({
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
    });

    test('SET_MESSAGE', () => {
        const state = subject(undefined, {});
        const newState = subject(state, actions.setMessage({
            text: 'foo',
            html: '<div>foo</div>'
        }));
        expect(newState.message).toBe('foo');
        expect(newState.htmlMessage).toBe('<div>foo</div>');
    });

    test('SET_CONTEXT_VALUE', () => {
        const state = subject(
            subject(undefined, {}),
            actions.setContextValue({ foo: 'bar' })
        );
        expect(state.context).toEqual({ foo: 'bar' });
    });

    test('SET_FORMATS', () => {
        const state = subject(
            subject(undefined, {}),
            actions.setFormats('{ "number": {} }')
        );
        expect(state.formats).toBe('{ "number": {} }');
    });

    test('SET_RENDER_LOCALE', () => {
        const state = subject(
            subject(undefined, {}),
            actions.setRenderLocale('fr-FR')
        );
        expect(state.renderLocale).toBe('fr-FR');
    });
});
