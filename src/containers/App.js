import { Component, createFactory } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MessageEditor from '../components/MessageEditor';
import ContextEditor from '../components/ContextEditor';
import * as actions from '../actions';
import * as selectors from '../selectors';

const
    tab = createFactory(Tab),
    tabs = createFactory(Tabs),
    tabList = createFactory(TabList),
    tabPanel = createFactory(TabPanel),
    messageEditor = createFactory(MessageEditor),
    contextEditor = createFactory(ContextEditor);

class AppContainer extends Component {
    render() {
        const { variables } = this.props;

        return h('div.app.animated.fadeIn', [
            h('div.container', [
                h('h1.header', 'Intl Live'),
                tabs(null, [
                    tabList({ key: 'tablist' }, [
                        tab({ key: 'template-tab' }, 'Template'),
                        tab({
                            key: 'context-tab',
                            disabled: variables.length === 0
                        }, 'Context')
                    ]),
                    tabPanel({ key: 'template-tabpanel' }, [
                        messageEditor(Object.assign({
                            key: 'message-editor'
                        }, this.props))
                    ]),
                    tabPanel({ key: 'context-tabpanel' }, [
                        contextEditor(Object.assign({
                            key: 'context-editor'
                        }, this.props))
                    ])
                ])
            ])
        ]);
    }
}

const mapStateToProps = state => Object.assign({
    rendered: selectors.rendered(state),
    variables: selectors.variables(state)
}, state);
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
