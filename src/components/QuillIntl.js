import { Component, createFactory } from 'react';
import h from 'react-hyperscript';
import Quill from 'react-quill';

const quill = createFactory(Quill);

export default class QuillIntl extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.quill.state.editor.addModule('intlToolbar', {
                container: this.toolbar
            });
        }, 0);
    }

    render() {
        return h('div', [
            h('div.intl-toolbar', {
                ref: el => { this.toolbar = el; }
            }),
            quill(Object.assign({
                ref: el => { this.quill = el; }
            }, this.props))
        ]);
    }
}
