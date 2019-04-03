import { createStore } from 'redux';
import reducer, * as subject from '../src/state';

const { selectors } = subject;

describe('State', () => {
    let store;

    beforeEach(() => {
        store = createStore(reducer);
    });

    describe('initial state', () => {
        it('should define message', () => {
            expect(selectors.getMessage(store.getState())).toBe('');
        });

        it('should define locale', () => {
            expect(selectors.getLocale(store.getState())).toBe('en-US');
        });

        it('should define context', () => {
            expect(selectors.getContext(store.getState())).toEqual({});
        });

        it('should define formats', () => {
            expect(selectors.getFormats(store.getState())).toBe('{}');
        });
    });

    describe('setMessage', () => {
        it('should update message state', () => {
            store.dispatch(subject.setMessage('Dummy text value'));
            expect(selectors.getMessage(store.getState())).toBe('Dummy text value');
        });
    });

    describe('setContextValue', () => {
        it('should update context value', () => {
            store.dispatch(subject.setContextValue({
                myVar: 1,
            }));
            store.dispatch(subject.setContextValue({
                myVar2: 'red',
            }));
            expect(selectors.getContext(store.getState())).toEqual({
                myVar: 1,
                myVar2: 'red',
            });
        });
    });

    describe('setFormats', () => {
        it('should update formats value', () => {
            store.dispatch(subject.setFormats('{ "number": {} }'));
            expect(selectors.getFormats(store.getState())).toBe('{ "number": {} }');
        });
    });

    describe('setRenderLocale', () => {
        it('should update render locale', () => {
            store.dispatch(subject.setRenderLocale('fr-FR'));
            expect(selectors.getLocale(store.getState())).toBe('fr-FR');
        });
    });
});
