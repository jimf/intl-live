import React, { Component } from 'react';
import PropTypes from 'prop-types';

const insertionMap = {
    number: '{foo, number}',
    date: '{foo, date, medium}',
    time: '{foo, time, medium}',
    select: `
{foo, select,
    foo {Foo}
    bar {Bar}
    other {Baz}
}`.trim(),
    plural: `
{foo, plural,
    =0 {no foos}
    one {# foo}
    other {# foos}
}`.trim(),
    selectordinal: `
{foo, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
}`.trim(),
};

class IntlEditor extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleChange(e) {
        if (this.textRef.current) {
            this.textRef.current.style.height = 'auto';
            this.textRef.current.style.height = this.textRef.current.scrollHeight + 'px';
        }
        this.props.onChange(e.target.value);
    }

    handleButton(e) {
        document.execCommand('inserttext', false, insertionMap[e.target.value]);
    }

    render() {
        return (
            <div className="intl-editor">
                <div className="intl-editor__toolbar">
                    {Object.keys(insertionMap).map(type => (
                        <button
                            type="button"
                            key={type}
                            value={type}
                            onClick={this.handleButton}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <textarea
                    className="intl-editor__input u-full-width"
                    onChange={this.handleChange}
                    ref={this.textRef}
                    value={this.props.text}
                />
            </div>
        );
    }
}

IntlEditor.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default IntlEditor;
