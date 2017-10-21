import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Music from './components/Music/Music';
import Player from './components/Music/Player';
import NoMatch404 from './components/NoMatch404';
import './Main.css';


const Main = props => (
  <div className='mainBody'>

    <div className='mainContent'>
      <header>
        <Navigation {...props.routing.location} />
      </header>
      <main>
        <Switch>
          <Route path='/' exact={true} render={() => <div><Home /><Projects {...props} /></div>} />
          <Route path='/projects' render={() => <Projects {...props} />} />
          <Route path='/music' render={() => <Music {...props} />} />
          <Route component={NoMatch404} />
        </Switch>
      </main>
    </div>

    {props.selectedMusic &&
      <Player {...props.selectedMusic} />}

    <footer className='mainFooter'>
      <Footer />
    </footer>

  </div>
);


export default Main;
