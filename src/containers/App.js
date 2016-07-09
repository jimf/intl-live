import R from 'ramda';
import { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import Quill from 'react-quill';

const quill = createFactory(Quill);

class AppContainer extends Component {
    render() {
        return h('div.app.animated.fadeIn', [
            h('div.container', [
                h('h1', 'Intl Live'),
                quill({
                    theme: 'snow',
                    value: 'Hello {name}',
                    toolbar: false
                })
            ])
        ]);
    }
}

export default connect(R.identity)(AppContainer);
