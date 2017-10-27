import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import store from '../../redux/store';
import { Container, Row } from 'reactstrap';
import Preview from './Preview';
import SelectedProject from './SelectedProject';
import NoMatch404 from '../helper/NoMatch404';


class Projects extends PureComponent {
  componentDidMount() {
    if (this.props.projects.length === 0) {
      this.props.fetchProjects();
    }
  }
  render() {
    const { projects, selectedProject } = this.props;
    const sectionHeading = this.props.selectedProject.title ? 'More projects' : 'Personal projects';

    const projectPreviews = projects.map((project, i) => {
      if (project.title !== selectedProject.title) {
        return (
          <Preview
            featured={project.featured && selectedProject.title === null}
            details={project}
            handleClick={() => store.dispatch(push(`/projects/${project.title}`))}
            key={`${project.title}_preview_${i}`}
          />
        );
      }
      return <div key={`${project.title}_preview_${i}`} />
    });

    const projectRoutes = projects.map((project, i) => {
      return (
        <Route
          path={`/projects/${project.title}`}
          exact={true}
          render={() => <SelectedProject {...this.props} />}
          key={`${project.title}_route_${i}`}
        />
      );
    });
    if (projectRoutes.length > 0) {
      projectRoutes.push(<Route path='/projects/*' component={NoMatch404} key={'404_route'} />);
    }

    return (
      <Container>
        <Switch>
          {projectRoutes}
        </Switch>

        {projectPreviews.length > 0 &&
          <h1 className='sectionHeading'>{sectionHeading}</h1>}

        <Row>
          {projectPreviews}
        </Row>
      </Container>
    );
  }
}


export default Projects;
