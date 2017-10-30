import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../Home/Home';
import Projects from '../Projects/Projects';
import Music from '../Music/Music';
import Player from '../Music/Player';
import NoMatch404 from '../helper/NoMatch404';

import Navigation from './Navigation';
import Footer from './Footer';
import './Main.css';


const Main = props => (
  <div className='mainBody'>

    <div className='mainContent'>
      <header>
        <Navigation {...props.routing.location} />
      </header>
      <main>
        <Switch>
          <Route path='/' exact={true} render={() => (<Home {...props}><Projects {...props} /></Home>)} />
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
