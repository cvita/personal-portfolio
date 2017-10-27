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


const Main = props => {
  const {
    siteText,
    projects,
    selectedProject,
    routing,
    fetchSiteText,
    fetchProjects,
    makeSelectedProject,
    } = props;

  const projectsComponent = (
    <Projects
      projects={projects}
      selectedProject={selectedProject}
      fetchProjects={fetchProjects}
      makeSelectedProject={makeSelectedProject}
      routing={routing}
    />
  );
  return (
    <div className='mainBody'>

      <div className='mainContent'>
        <header>
          <Navigation {...routing.location} />
        </header>
        <main>
          <Switch>
            <Route path='/' exact={true} render={() => (
              <div>
                <Home{...siteText} fetchSiteText={fetchSiteText} />
                {projectsComponent}
              </div>
            )}
            />
            <Route path='/projects' render={() => projectsComponent} />
            <Route path='/music' render={() => <Music {...props} />} />
            <Redirect from='/personal-portfolio' to='/' />
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
}


export default Main;
