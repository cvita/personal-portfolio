import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import store from '../redux/store';

import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container, Row, Col, Button, Card, CardTitle, CardText, CardBody, CardImgOverlay } from 'reactstrap';
import './Projects.css';

import laptopImage from '../assets/laptop.png';
import SelectedProject from './SelectedProject';
import NoMatch404 from './NoMatch404';


const ScreenshotInLaptop = props => (
  <div className='screenshotInLaptop'>
    <img className='laptop' src={laptopImage} alt='laptop' />
    <div className='screenshotContainer'>
      <img className='screenshot' src={props.images.medium.source_url} alt={props.title + ' screenshot'} />
    </div>
  </div>
);

const Preview = props => {
  const { title, titlePretty, short_description, tech_stack, images } = props.details;
  const outerColSize = props.featured ? '12' : '4';
  const innerColSize = props.featured ? '6' : '12';
  return (
    <Col md={outerColSize} sm='12'>
      <LazyLoad>
        <CSSTransitionGroup
          transitionName='fadeInOnLoad'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <Card className='preview'>
            <CardBody>
              <CardTitle className='previewTitle'>{titlePretty}</CardTitle>
            </CardBody>

            <Container className='previewImageContainer'>
              <Row>
                <Col lg='6' md={innerColSize} xs={'12'}>
                  <ScreenshotInLaptop images={images} title={title} />
                </Col>
                <Col lg='6' md={innerColSize} xs={'12'}>
                  <div className='previewTechStack'>
                    <h5>{tech_stack}</h5>
                  </div>
                </Col>
              </Row>
            </Container>

            <CardBody>
              <CardText className='previewShortDescription'>{short_description}</CardText>
            </CardBody>

            <CardImgOverlay className='previewCardImgOver'>
              <div className='previewOverlayBackground' onClick={props.handleClick}>
                <Button className='previewSelect' color='secondary' outline>Read more</Button>
              </div>
            </CardImgOverlay>

          </Card>
        </CSSTransitionGroup>
      </LazyLoad>
    </Col>
  );
}

class Projects extends React.Component {
  componentDidMount() {
    if (this.props.projects.length === 0) {
      this.props.fetchProjects();
    }
  }
  render() {
    const { projects, selectedProject } = this.props;
    const projectPreviews = projects.map((project, i) => {
      if (project.title !== selectedProject.title) {
        return <Preview
          featured={project.featured && selectedProject.title === null}
          details={project}
          handleClick={() => store.dispatch(push(`/projects/${project.title}`))}
          key={`${project.title}_preview_${i}`}
        />;
      } else {
        return <div key={`${project.title}_preview_${i}`} />
      }
    });

    const projectRoutes = projects.map((project, i) => {
      return <Route
        path={`/projects/${project.title}`}
        exact={true}
        render={() => <SelectedProject {...this.props} />}
        key={`${project.title}_route_${i}`}
      />;
    });

    if (projects.length > 0) {
      projectRoutes.push(<Route path='/projects/*' component={NoMatch404} key={'404_route'} />);
    }

    return (
      <Container>
        <h1 className='sectionHeading'>Personal projects</h1>

        <Row>
          <Col>
            <Switch>
              {projectRoutes}
            </Switch>
          </Col>
        </Row>

        <Row>
          {projectPreviews}
        </Row>

      </Container>
    );
  }
}


export default Projects;
