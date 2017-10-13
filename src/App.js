import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
//import SelectedProject from './components/SelectedProject';
import Projects from './components/Projects';
import NoMatch404 from './components/NoMatch404';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/projects/*' component={Projects} />
          <Route component={NoMatch404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
