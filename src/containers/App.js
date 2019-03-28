import { Component, createFactory } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MessageEditor from '../components/MessageEditor';
import ContextEditor from '../components/ContextEditor';
import FormatsEditor from '../components/FormatsEditor';
import * as actions from '../state';
import * as selectors from '../selectors';

class AppContainer extends Component {
    render() {
        const { variableNames } = this.props;

        return (
            <div className="app animated fadeIn">
                <div className="container">
                    <h1 className="header">Intl Live</h1>
                    <Tabs>
                        <TabList>
                            <Tab>Template</Tab>
                            <Tab disabled={!variableNames.length}>Context</Tab>
                            <Tab>Formats</Tab>
                        </TabList>
                        <TabPanel>
                            <MessageEditor {...props} />
                        </TabPanel>
                        <TabPanel>
                            <ContextEditor {...props} />
                        </TabPanel>
                        <TabPanel>
                            <FormatsEditor {...props} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => Object.assign({
    rendered: selectors.rendered(state),
    variables: selectors.variables(state),
    variableNames: selectors.variableNames(state)
}, state);
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
