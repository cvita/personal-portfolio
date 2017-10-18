import React from 'react';
import Main from './Main';

import { ConnectedRouter } from 'react-router-redux';
import { history } from './redux/store';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './redux/actionCreators';


const App = props => (
  <ConnectedRouter history={history}>
    <Main {...props} />
  </ConnectedRouter>
);

const mapStateToProps = state => ({
  selectedProject: state.selectedProject,
  projects: state.projects,
  errors: state.errors,
  routing: state.routing
});

const mapDispatchToProps = dispatch => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(App);
