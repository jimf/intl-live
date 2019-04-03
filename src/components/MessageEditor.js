import React from 'react';
import PropTypes from 'prop-types';
import IntlEditor from './IntlEditor';

const MessageEditor = ({
    message,
    setMessage,
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
    </div>
);

MessageEditor.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    variableNames: PropTypes.array.isRequired
};

export default MessageEditor;
