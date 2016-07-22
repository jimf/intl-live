import { PropTypes } from 'react';
import h from 'react-hyperscript';

const handleContextChange = (f, x) => e => f({ [x]: e.target.value });

const ContextEditor = ({
    context,
    setContextValue,
    variableNames
}) => (
    h('div', variableNames.map(variable => (
        h('label', {
            key: variable
        }, [
            `${variable}: `,
            h('input', {
                type: 'text',
                value: context[variable] || '',
                onChange: handleContextChange(setContextValue, variable)
            })
        ])
    )))
);

ContextEditor.propTypes = {
    context: PropTypes.object.isRequired,
    setContextValue: PropTypes.func.isRequired,
    variableNames: PropTypes.array.isRequired
};

export default ContextEditor;
