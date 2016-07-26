import h from 'react-hyperscript';
import { createFactory, PropTypes } from 'react';
import Quill from './QuillIntl';
import { withValue } from '../util';

const quill = createFactory(Quill);
const formats = [];

/**
 * Call props change handler with the text value of the editor on change.
 */
const handleChange = onChange => (value, delta, source, editor) => {
    const text = editor.getText();
    onChange({ text, html: value });
};

const MessageEditor = ({
    locales,
    message,
    htmlMessage,
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
            value: htmlMessage,
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
    htmlMessage: PropTypes.string.isRequired,
    renderLocale: PropTypes.string.isRequired,
    rendered: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    setRenderLocale: PropTypes.func.isRequired,
    variableNames: PropTypes.array.isRequired
};

export default MessageEditor;
