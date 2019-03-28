import React, { Component } from 'react';
import Quill from 'react-quill';

export default class QuillIntl extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.quill.state.editor.addModule('intlToolbar', {
                container: this.toolbar
            });
        }, 0);
    }

    render() {
        return (
            <div>
                <div className="intl-toolbar" ref={el => { this.toolbar = el; } } />
                <Quill ref={el => { this.quill = el; } } {...this.props} />
            </div>
        );
    }
}
