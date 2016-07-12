import { createAction } from 'redux-actions';

/**
 * Update message state.
 */
export const SET_MESSAGE = 'SET_MESSAGE';
export const setMessage = createAction(SET_MESSAGE);

/**
 * Locale to render the message in.
 */
export const SET_RENDER_LOCALE = 'SET_RENDER_LOCALE';
export const setRenderLocale = createAction(SET_RENDER_LOCALE);
