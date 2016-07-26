import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { withValue } from '../util';

const EXAMPLE = `{
  "number": {
    "usd": { "style": "currency", "currency": "USD" }
  }
}`;

const FormatsEditor = ({ formats, setFormats }) => (
    h('div', [
        h('div.row', [
            h('div.column.one-half', [
                h('h5', 'Define custom formats'),
                h('textarea.formats-editor.u-full-width', {
                    value: formats,
                    onChange: withValue(setFormats),
                    rows: 5
                })
            ]),
            h('div.column.one-half', [
                h('h5', 'Example'),
                h('pre', [
                    h('code', EXAMPLE)
                ])
            ])
        ])
    ])
);

FormatsEditor.propTypes = {
    formats: PropTypes.string.isRequired,
    setFormats: PropTypes.func.isRequired
};

export default FormatsEditor;
