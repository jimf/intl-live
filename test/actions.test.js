import * as subject from '../src/actions';

describe('Actions', () => {
    test('SET_MESSAGE', () => {
        expect(subject.SET_MESSAGE).toBe('SET_MESSAGE');
        expect(subject.setMessage('dummy')).toEqual({
            type: subject.SET_MESSAGE,
            payload: 'dummy'
        });
    });

    test('SET_CONTEXT_VALUE', () => {
        expect(subject.SET_CONTEXT_VALUE).toBe('SET_CONTEXT_VALUE');
        expect(subject.setContextValue({ dummy: 'dummy' })).toEqual({
            type: subject.SET_CONTEXT_VALUE,
            payload: { dummy: 'dummy' }
        });
    });

    test('SET_FORMATS', () => {
        expect(subject.SET_FORMATS).toBe('SET_FORMATS');
        expect(subject.setFormats({ dummy: 'dummy' })).toEqual({
            type: subject.SET_FORMATS,
            payload: { dummy: 'dummy' }
        });
    });

    test('SET_RENDER_LOCALE', () => {
        expect(subject.SET_RENDER_LOCALE).toBe('SET_RENDER_LOCALE');
        expect(subject.setRenderLocale('dummy')).toEqual({
            type: subject.SET_RENDER_LOCALE,
            payload: 'dummy'
        });
    });
});
