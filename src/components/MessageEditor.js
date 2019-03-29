import React from 'react';
import PropTypes from 'prop-types';
import IntlEditor from './IntlEditor';

const MessageEditor = ({
    locales,
    message,
    renderLocale,
    rendered,
    setMessage,
    setRenderLocale,
    variableNames
}) => (
    <div>
        <div>
            <strong>Variables:</strong>{' '}
            {variableNames.join(', ')}
        </div>
        <IntlEditor
            text={message}
            onChange={setMessage}
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
    renderLocale: PropTypes.string.isRequired,
    rendered: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    setRenderLocale: PropTypes.func.isRequired,
    variableNames: PropTypes.array.isRequired
};

export default MessageEditor;
