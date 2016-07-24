import { PropTypes } from 'react';
import h from 'react-hyperscript';

const handleContextChange = (f, x) => e => f({ [x]: e.target.value });

const renderInput = (name, type, context, setContextValue) => {
    const element = 'input.variable-input';
    let inputType = 'text';

    if (['numberFormat', 'pluralFormat'].includes(type)) {
        inputType = 'number';
    } else if (type === 'dateFormat') {
        inputType = 'date';
    } else if (type === 'timeFormat') {
        inputType = 'time';
    }

    return h(element, {
        type: inputType,
        value: context[name] || '',
        onChange: handleContextChange(setContextValue, name)
    });
};

const ContextEditor = ({
    context,
    setContextValue,
    variables
}) => (
    h('div', variables.map(([name, type]) => (
        h('label', {
            key: name
        }, [
            h('span.variable-label', `${name}: `),
            renderInput(name, type, context, setContextValue)
        ])
    )))
);

ContextEditor.propTypes = {
    context: PropTypes.object.isRequired,
    setContextValue: PropTypes.func.isRequired,
    variables: PropTypes.array.isRequired
};

export default ContextEditor;
