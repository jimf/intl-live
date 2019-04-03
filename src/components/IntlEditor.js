import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as IcuMessage from '../icu_message';

const insertionMap = {
    number: IcuMessage.tidy('{foo, number}'),
    date: IcuMessage.tidy('{foo, date, medium}'),
    time: IcuMessage.tidy('{foo, time, medium}'),
    select: IcuMessage.tidy('{foo, select, foo {Foo} bar {Bar} other {Baz}}'),
    plural: IcuMessage.tidy('{foo, plural, =0 {no foos} one {# foo} other {# foos}}'),
    selectordinal: IcuMessage.tidy('{foo, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}'),
};

class IntlEditor extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
        ['Change', 'IcuButton', 'Tidy', 'Uglify'].forEach(name => {
            const handlerName = `handle${name}`;
            this[handlerName] = this[handlerName].bind(this);
        });
    }

    handleChange(e) {
        if (this.textRef.current) {
            this.textRef.current.style.height = 'auto';
            this.textRef.current.style.height = this.textRef.current.scrollHeight + 'px';
        }
        this.props.onChange(e.target.value);
    }

    handleIcuButton(e) {
        document.execCommand('inserttext', false, insertionMap[e.target.value]);
    }

    handleTidy() {
        try {
            this.props.onChange(IcuMessage.tidy(this.props.text));
        } catch (e) {
            /* ignore */
        }
    }

    handleUglify() {
        try {
            this.props.onChange(IcuMessage.uglify(this.props.text));
        } catch (e) {
            /* ignore */
        }
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
                            onClick={this.handleIcuButton}
                        >
                            {type}
                        </button>
                    ))}
                    <button type="button" onClick={this.handleTidy}>Tidy</button>
                    <button type="button" onClick={this.handleUglify}>Uglify</button>
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
