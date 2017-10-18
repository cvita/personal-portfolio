import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Projects from './components/Projects/Projects';
import NoMatch404 from './components/NoMatch404';


const Main = props => (
  <div>
    <header>
      <Navigation {...props.routing.location} />
    </header>

    <main>
      <Switch>
        <Route
          path='/'
          exact={true}
          render={() => (
            <div>
              <Home />
              <Projects {...props} />
            </div>)}
        />

        <Route path='/projects' render={() => <Projects {...props} />} />

        <Route component={NoMatch404} />
      </Switch>
    </main>

    <footer>
      <div
        style={{
          width: '100%',
          height: '50px',
          marginTop: '500px',
          textAlign: 'center'
        }}
      >
        Footer goes here
      </div>
    </footer>
  </div>
);


export default Main;
