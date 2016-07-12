import h from 'react-hyperscript';
import { createFactory, PropTypes } from 'react';
import Quill from 'react-quill';

const quill = createFactory(Quill);
const formats = [];

/**
 * Call props change handler with the text value of the editor on change.
 */
const handleChange = onChange => (value, delta, source, editor) => {
    const text = editor.getText();

    // Fix bug with auto-trimming on change by not triggering event when space
    // is typed.
    if (!text.endsWith(' \n')) {
        onChange(editor.getText());
    }
};

const withValue = cb => e => cb(e.target.value);

const MessageEditor = ({
    locales,
    message,
    renderLocale,
    setMessage,
    setRenderLocale,
    variables
}) => (
    h('div', [
        h('div', [
            h('strong', 'Variables: '),
            variables.join(', ')
        ]),
        quill({
            key: 'quill',
            theme: 'snow',
            toolbar: false,
            formats,
            value: message,
            onChange: handleChange(setMessage)
        }),
        h('pre', [
            h('code', '<rendering to go here>')
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
    setMessage: PropTypes.func.isRequired,
    setRenderLocale: PropTypes.func.isRequired,
    variables: PropTypes.array.isRequired
};

export default MessageEditor;
