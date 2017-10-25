import React, { Component } from 'react';
import initialState from '../../redux/initialState';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import YouTubePlayer from '../helper/YouTubePlayer';
import './SelectedProject.css';


const TechStack = props => (
  <ListGroup>
    {props.list.split(', ').map(tech => {
      return (<ListGroupItem className='subtitle select' key={tech}>
        <i className="fa fa-check-circle-o" aria-hidden="true"></i> {tech}
      </ListGroupItem>);
    })}
  </ListGroup>
);

const SelectedProjectLayout = props => {
  const {
    titlePretty,
    projectBackground,
    title,
    images,
    short_description,
    long_description,
    github_url,
    demo_url,
    tech_stack,
    travis,
    video
    } = props;
  return (
    <div>
      <Row>
        <Col>
          <h1 className='title'>
            {titlePretty}
            {travis &&
              <span>
                {' '}<img src={`https://travis-ci.org/VitaC123/${title}.svg?branch=master`} alt='travis-ci' />
              </span>}
          </h1>
          <p className='subtitle lead'>{short_description}</p>
        </Col>
      </Row>

      <Row>
        <Col md='8' xs='12'>
          <div className='featuredMedia'>
            {video ?
              <YouTubePlayer videoId={video} title={title} /> :
              <img src={images.large.source_url} alt={title} />}
          </div>

          <div className='viewButtonContainer'>
            <h3 className='sectionHeading selected view'>View</h3>
            <a href={github_url}><Button className='viewButton' color='link'>
              <i className="fa fa-github" aria-hidden="true"></i> Source</Button>
            </a>
            <a href={demo_url}><Button className='viewButton' color='link'>
              <i className="fa fa-desktop" aria-hidden="true"></i> Demo</Button>
            </a>
          </div>
        </Col>

        <Col md='4' xs='12'>
          {/* intentionally empty */}
        </Col>
      </Row>

      <Row>
        <Col md='8' xs='12'>
          <h3 className='sectionHeading selected'>Project background</h3>
          <div className='bodyText selected projectBackground' dangerouslySetInnerHTML={{ __html: projectBackground }} />
        </Col>
        <Col md='4' xs='12'>
          <h3 className='sectionHeading selected'>Technologies</h3>
          <TechStack list={tech_stack} />
        </Col>
      </Row>
      <Row>
        <Col md='8' xs='12'>
          <h3 className='sectionHeading selected'>Detailed description</h3>
          <p className='bodyText selected' dangerouslySetInnerHTML={{ __html: long_description }} />
        </Col>
        <Col md='4' xs='12'>
       
        </Col>
      </Row>
    </div>
  );
};

class SelectedProject extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const url = window.location.pathname.toString();
    const titleInUrl = url.slice(url.indexOf('/projects/') + 10);
    const { projects } = this.props;
    const selectedProjectIndex = projects.findIndex(project => project.title === titleInUrl);
    this.props.makeSelectedProject(projects[selectedProjectIndex]);
  }
  componentWillUnmount() {
    this.props.makeSelectedProject(initialState.selectedProject);
  }
  render() {
    return (
      <Container className='selectedProject'>
        {typeof this.props.selectedProject.title === 'string' &&
          <SelectedProjectLayout {...this.props.selectedProject} />}
      </Container>
    );
  }
}


export default SelectedProject;
