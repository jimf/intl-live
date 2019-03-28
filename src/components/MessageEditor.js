import React, { PropTypes } from 'react';
import Quill from './QuillIntl';

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
    <div>
        <div>
            <strong>Variables:</strong>
            {variableNames.join(', ')}
        </div>
        <Quill
            theme="snow"
            toolbar={false}
            styles={false}
            formats={formats}
            value={htmlMessage}
            onChange={handleChange(setMessage)}
        />
        <pre>
            <code>{rendered || ' '}</code>
        </pre>
        <label className="u-pull-right">
            Locale:
            <select value={renderLocale} onChange={e => setRenderLocale(e.target.value)}>
                {locales.map(locale => (
                    <option key={locale}>{locale}</option>
                ))}
            </select>
        </label>
    </div>
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
