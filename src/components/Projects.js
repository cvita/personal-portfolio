import React from 'react';
import laptopImage from '../assets/laptop.png';
import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container, Row, Col, Button, Card, CardTitle, CardText, CardBody, CardImgOverlay } from 'reactstrap';
import './Projects.css';
import SelectedProject from './SelectedProject';


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
    const myProjects = projects.map((details, i) => {
      if (selectedProject && details.title === selectedProject.title) {
        return <div key={details.title + i} />
      }
      return (
        <Preview
          featured={i === 0 && !selectedProject}
          details={details}
          handleClick={() => this.props.makeSelectedProject(details)}
          key={details.title + i}
        />
      );
    });

    return (
      <Container>
        <h1 className='sectionHeading'>Personal projects</h1>

        {selectedProject && (
          <Row>
            <Col>
              <SelectedProject {...this.props.selectedProject} />
            </Col>
          </Row>
        )}

        <Row>
          {myProjects}
        </Row>
      </Container>
    );
  }
}


export default Projects;
