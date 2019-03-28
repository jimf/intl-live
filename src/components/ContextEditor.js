import React from 'react';
import PropTypes from 'prop-types';

const handleContextChange = (f, x) => e => f({ [x]: e.target.value });
const inputTypeMap = {
    numberFormat: 'number',
    pluralFormat: 'number',
    dateFormat: 'date',
    timeFormat: 'time',
};

const ContextEditor = ({
    context,
    setContextValue,
    variables
}) => (
    <div>
        {variables.map(([name, type]) => (
            <label key={name}>
                <span className="variable-label">{name}</span>
                <input
                    type={inputTypeMap[type] || 'text'}
                    value={context[name] || ''}
                    onChange={handleContextChange(setContextValue, name)}
                />
            </label>
        ))}
    </div>
);

ContextEditor.propTypes = {
    context: PropTypes.object.isRequired,
    setContextValue: PropTypes.func.isRequired,
    variables: PropTypes.array.isRequired
};

export default ContextEditor;
