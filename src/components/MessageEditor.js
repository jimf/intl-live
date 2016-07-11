import { createFactory, PropTypes } from 'react';
import Quill from 'react-quill';

const quill = createFactory(Quill);
const formats = [];

/**
 * Call props change handler with the text value of the editor on change.
 */
const handleChange = onChange => (value, delta, source, editor) =>
    onChange(editor.getText());

const MessageEditor = ({ message, setMessage }) => (
    quill({
        key: 'quill',
        theme: 'snow',
        toolbar: false,
        formats,
        value: message,
        onChange: handleChange(setMessage)
    })
);

MessageEditor.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired
};

export default MessageEditor;
