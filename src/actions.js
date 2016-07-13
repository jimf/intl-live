import { createAction } from 'redux-actions';

/**
 * Update message state.
 */
export const SET_MESSAGE = 'SET_MESSAGE';
export const setMessage = createAction(SET_MESSAGE);

/**
 * Set value for context variable.
 */
export const SET_CONTEXT_VALUE = 'SET_CONTEXT_VALUE';
export const setContextValue = createAction(SET_CONTEXT_VALUE);

/**
 * Locale to render the message in.
 */
export const SET_RENDER_LOCALE = 'SET_RENDER_LOCALE';
export const setRenderLocale = createAction(SET_RENDER_LOCALE);
