import React from 'react';
import PropTypes from 'prop-types';

const EXAMPLE = `{
  "number": {
    "usd": { "style": "currency", "currency": "USD" }
  }
}`;

const FormatsEditor = ({ formats, setFormats }) => (
    <div>
        <div className="row">
            <div className="column one-half">
                <h5>Define custom formats</h5>
                <textarea className="formats-editor u-full-width"
                    value={formats}
                    onChange={e => setFormats(e.target.value)}
                    rows="5"
                />
            </div>
            <div className="column one-half">
                <h5>Example</h5>
                <pre>
                    <code>{EXAMPLE}</code>
                </pre>
            </div>
        </div>
    </div>
);

FormatsEditor.propTypes = {
    formats: PropTypes.string.isRequired,
    setFormats: PropTypes.func.isRequired
};

export default FormatsEditor;
