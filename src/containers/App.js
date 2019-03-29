import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MessageEditor from '../components/MessageEditor';
import ContextEditor from '../components/ContextEditor';
import FormatsEditor from '../components/FormatsEditor';
import * as actions from '../state';
import * as selectors from '../selectors';

const locales = [
    'cs-CZ',
    'en-US',
    'es-AR',
    'fr-FR',
    'ja-JP',
    'pt-BR'
];

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
                            <MessageEditor {...this.props} />
                        </TabPanel>
                        <TabPanel>
                            <ContextEditor {...this.props} />
                        </TabPanel>
                        <TabPanel>
                            <FormatsEditor {...this.props} />
                        </TabPanel>
                    </Tabs>
                    <pre>
                        <code>{this.props.rendered || ' '}</code>
                    </pre>
                    <label className="u-pull-right">
                        Locale:{' '}
                        <select value={this.props.renderLocale} onChange={e => this.props.setRenderLocale(e.target.value)}>
                            {locales.map(locale => (
                                <option key={locale}>{locale}</option>
                            ))}
                        </select>
                    </label>
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
