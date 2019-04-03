import lz from 'lz-string';

const SET_MESSAGE = 'SET_MESSAGE';
const SET_CONTEXT_VALUE = 'SET_CONTEXT_VALUE';
const SET_FORMATS = 'SET_FORMATS';
const SET_RENDER_LOCALE = 'SET_RENDER_LOCALE';
const SET_STATE_FROM_SERIALIZED = 'SET_STATE_FROM_SERIALIZED';

/**
 * Action creator for updating message state.
 *
 * @param {string} message New message value
 * @return {object} Redux action
 */
export const setMessage = message => ({
    type: SET_MESSAGE,
    payload: message,
});

/**
 * Action creator for setting a context variable.
 *
 * @param {object} payload Payload object
 * @return {object} Redux action
 */
export const setContextValue = payload => ({
    type: SET_CONTEXT_VALUE,
    payload,
});

/**
 * Action creator for setting the value for custom formats.
 *
 * @param {string} formats JSON-stringified format value
 * @return {object} Redux action
 */
export const setFormats = formats => ({
    type: SET_FORMATS,
    payload: formats,
});

/**
 * Action creator for setting the locale to render the message in.
 *
 * @param {string} locale Locale value
 * @return {object} Redux action
 */
export const setRenderLocale = locale => ({
    type: SET_RENDER_LOCALE,
    payload: locale,
});

/**
 * Update state to match given serialized state.
 *
 * @param {string} payload Serialized state
 * @return {object} Redux action
 */
export const setStateFromSerialized = payload => ({
    type: SET_STATE_FROM_SERIALIZED,
    payload,
});

const initialState = () => ({
    message: '',
    context: {},
    formats: '{}',
    renderLocale: 'en-US',
});

export default (state = initialState(), action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };

        case SET_CONTEXT_VALUE:
            return {
                ...state,
                context: Object.assign({}, state.context, action.payload),
            };

        case SET_FORMATS:
            return {
                ...state,
                formats: action.payload,
            };

        case SET_RENDER_LOCALE:
            return {
                ...state,
                renderLocale: action.payload,
            };

        case SET_STATE_FROM_SERIALIZED:
            try {
                const values = JSON.parse(
                    lz.decompressFromEncodedURIComponent(action.payload)
                );
                return {
                    message: values[0],
                    context: values[1],
                    formats: values[2],
                    renderLocale: values[3],
                };
            } catch (e) {
                console.warn('Invalid serialized state ignored');
                return state;
            }

        default:
            return state;
    }
};

export const selectors = {};

selectors.getMessage = state => state.message;
selectors.getLocale = state => state.renderLocale;
selectors.getContext = state => state.context;
selectors.getFormats = state => state.formats;
selectors.getSerialized = state =>
    lz.compressToEncodedURIComponent(JSON.stringify([
        state.message,
        state.context,
        state.formats,
        state.renderLocale,
    ]));
