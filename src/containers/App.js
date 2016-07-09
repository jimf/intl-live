import R from 'ramda';
import { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import Quill from 'react-quill';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const
    quill = createFactory(Quill),
    tab = createFactory(Tab),
    tabs = createFactory(Tabs),
    tabList = createFactory(TabList),
    tabPanel = createFactory(TabPanel);

class AppContainer extends Component {
    render() {
        return h('div.app.animated.fadeIn', [
            h('div.container', [
                h('h1', 'Intl Live'),
                tabs(null, [
                    tabList({ key: 'tablist' }, [
                        tab({ key: 'template-tab' }, 'Template'),
                        tab({ key: 'context-tab' }, 'Context')
                    ]),
                    tabPanel({ key: 'template-tabpanel' }, [
                        quill({
                            key: 'quill',
                            theme: 'snow',
                            value: 'Hello {name}',
                            toolbar: false
                        })
                    ]),
                    tabPanel({ key: 'context-tabpanel' }, [
                        h('h2', { key: 'context-title' }, 'context panel')
                    ])
                ])
            ])
        ]);
    }
}

export default connect(R.identity)(AppContainer);
