import { createFactory, PropTypes } from 'react';
import Quill from 'react-quill';

const quill = createFactory(Quill);

const MessageEditor = ({ message }) => (
    quill({
        key: 'quill',
        theme: 'snow',
        toolbar: false,
        value: message
    })
);

MessageEditor.propTypes = {
    message: PropTypes.string.isRequired
};

export default MessageEditor;
