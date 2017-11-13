import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import FadeIn from '../helper/FadeIn';
import Home from '../Home/Home';
import Projects from '../Projects/Projects';
import Music from '../Music/Music';
import Player from '../Music/Player';
import NoMatch404 from '../helper/NoMatch404';

import Navigation from './Navigation';
import Footer from './Footer';
import './Main.css';


class Main extends Component {
  componentWillMount() {
    // Ensures app knows when stylesheet has loaded
    document.getElementById('styleSheetBootstrap').addEventListener('load', this.props.refreshStyleSheetStatus);
  }
  render() {
    return (
      <div className='mainBody'>

        <div className='mainContent'>
          <header>
            {this.props.styleSheetLoaded && (
              <FadeIn>
                <Navigation {...this.props.routing.location} />
              </FadeIn>)}
          </header>
          <main>
            <Switch>
              <Route path='/' exact={true} render={() => (<Home {...this.props}><Projects {...this.props} /></Home>)} />
              <Route path='/projects' render={() => <Projects {...this.props} />} />
              <Route path='/music' render={() => <Music {...this.props} />} />
              <Route component={NoMatch404} />
            </Switch>
          </main>
        </div>

        {this.props.selectedMusic &&
          <Player {...this.props.selectedMusic} />}

        <footer className='mainFooter'>
          <Footer />
        </footer>

      </div>
    );
  }
}


export default Main;
