import R from 'ramda';
import { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MessageEditor from '../components/MessageEditor';

const
    tab = createFactory(Tab),
    tabs = createFactory(Tabs),
    tabList = createFactory(TabList),
    tabPanel = createFactory(TabPanel),
    messageEditor = createFactory(MessageEditor);

class AppContainer extends Component {
    render() {
        return h('div.app.animated.fadeIn', [
            h('div.container', [
                h('h1.header', 'Intl Live'),
                tabs(null, [
                    tabList({ key: 'tablist' }, [
                        tab({ key: 'template-tab' }, 'Template'),
                        tab({ key: 'context-tab' }, 'Context')
                    ]),
                    tabPanel({ key: 'template-tabpanel' }, [
                        messageEditor({ message: 'Hello {name}' })
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
