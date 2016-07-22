import h from 'react-hyperscript';
import { createFactory, PropTypes } from 'react';
import Quill from 'react-quill';
import { withValue } from '../util';

const quill = createFactory(Quill);
const formats = [];
const HAS_TRAILING_WHITESPACE = /[ \n\r]\n$/;

/**
 * Call props change handler with the text value of the editor on change.
 */
const handleChange = onChange => (value, delta, source, editor) => {
    const text = editor.getText();

    // Fix bug with auto-trimming on change by not triggering event when space
    // is typed. Still isn't quite right for newlines :-(
    if (!HAS_TRAILING_WHITESPACE.test(text)) {
        onChange(text);
    }
};

const MessageEditor = ({
    locales,
    message,
    renderLocale,
    rendered,
    setMessage,
    setRenderLocale,
    variableNames
}) => (
    h('div', [
        h('div', [
            h('strong', 'Variables: '),
            variableNames.join(', ')
        ]),
        quill({
            key: 'quill',
            theme: 'snow',
            toolbar: false,
            styles: false,
            formats,
            value: message,
            onChange: handleChange(setMessage)
        }),
        h('pre', [
            h('code', rendered || ' ')
        ]),
        h('label.u-pull-right', [
            'Locale: ',
            h('select', {
                value: renderLocale,
                onChange: withValue(setRenderLocale)
            }, locales.map(locale => h('option', locale)))
        ])
    ])
);

MessageEditor.propTypes = {
    locales: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
    renderLocale: PropTypes.string.isRequired,
    rendered: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    setRenderLocale: PropTypes.func.isRequired,
    variableNames: PropTypes.array.isRequired
};

export default MessageEditor;
