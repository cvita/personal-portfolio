import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Home from './components/Home';
import Projects from './components/Projects';
import NoMatch404 from './components/NoMatch404';


const Main = props => (
  <div>
    <header>
      <Link to='/'>Home</Link>{' '}
      <Link to='/projects'>Projects</Link>
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
