import React, { Component } from 'react';
import initialState from '../../redux/initialState';
import { Container, Row, Col } from 'reactstrap';


class SelectedProject extends Component {
  componentDidMount() {
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
    const { title, titlePretty, images, short_description, long_description, tech_stack } = this.props.selectedProject;

    return (
      <Container>
        <Row>
          <Col>
            <h1>{titlePretty}</h1>
            <h5>{short_description}</h5>

            {images && images.medium && (
              <img src={images.medium.source_url} alt={title} />)}

          </Col>
        </Row>

        <Row>
          <Col md='8' sm='12'>
            <p dangerouslySetInnerHTML={{ __html: long_description }} />
          </Col>
          <Col md='4' sm='12'>
            <ul>
              <li>{tech_stack}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default SelectedProject;
