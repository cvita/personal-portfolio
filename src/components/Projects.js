import React from 'react';
import laptopImage from '../assets/laptop.png';
import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container, Row, Col, Button, Card, CardTitle, CardText, CardBody, CardImgOverlay } from 'reactstrap';
import './Projects.css';
import SelectedProject from './SelectedProject';


function ScreenshotInLaptop(props) {
  const { images, title } = props;
  return (
    <div className='screenshotInLaptop'>
      <img className='laptop' src={laptopImage} alt='laptop' />
      <div className='screenshotContainer'>
        <img className='screenshot' src={images.medium.source_url} alt={title + ' screenshot'} />
      </div>
    </div>
  );
}

function Preview(props) {
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
              <div className='previewOverlayBackground' onClick={() => props.handleSelect(props.details)}>
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
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: null
    };
    this.parseWPResponse = this.parseWPResponse.bind(this);
    this.assignSelectedProject = this.assignSelectedProject.bind(this);
  }
  componentDidMount() {
    const wpURL = window.location.origin.indexOf('localhost') === -1 ?
      'https://chrisvita.com/wordpress/wp-json/wp/v2/projects?_embed' :
      'http://localhost:8888/wp-json/wp/v2/projects?_embed';
    fetch(wpURL)
      .then(res => res.json())
      .then(res => this.setState({ projects: res.map(project => this.parseWPResponse(project)) }));
  }
  parseWPResponse(project) {
    return ({
      ...project.acf,
      images: project._embedded['wp:featuredmedia'][0].media_details.sizes,
      titlePretty: project.title.rendered
    });
  }
  assignSelectedProject(details) {
    this.setState({ selectedProject: details });
  }
  render() {
    const { projects, selectedProject } = this.state;

    const myProjects = projects.map((details, i) => {
      if (selectedProject && details.title === selectedProject.title) {
        return <div key={details.title + i} />
      }
      return (
        <Preview
          featured={i === 0 && !selectedProject}
          details={details}
          handleSelect={selectedProjectDetails => this.assignSelectedProject(selectedProjectDetails)}
          key={details.title + i}
        />
      );
    });

    return (
      <div>
        <h1 className='sectionHeading'>Personal projects</h1>

        {selectedProject && (
          <Row>
            <Col>
              <SelectedProject {...selectedProject} />
            </Col>
          </Row>
        )}

        <Row>
          {myProjects}
        </Row>
      </div>
    );
  }
}


export default Projects;
