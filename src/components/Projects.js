import React from 'react';
import laptopImage from '../assets/laptop.png';
import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container, Row, Col, Card, CardTitle, CardText, CardBody, CardLink } from 'reactstrap';
import './Projects.css';


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

class Preview extends React.Component {
  render() {
    const { title, titlePretty, github_url, demo_url, short_description, tech_stack, images } = this.props.details;
    return (
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
                <Col lg='6' md={this.props.size || '12'} xs={'12'}>
                  <ScreenshotInLaptop images={images} title={title} />
                </Col>
                <Col lg='6' md={this.props.size || '12'} xs={'12'}>
                  <div className='previewTechStack'>
                    <h5>{tech_stack}</h5>
                  </div>
                </Col>
              </Row>
            </Container>

            <CardBody>
              <CardText className='previewShortDescription'>{short_description}</CardText>
              <CardLink href={demo_url}>Demo</CardLink>
              <CardLink href={github_url}>GitHub</CardLink>
            </CardBody>

          </Card>
        </CSSTransitionGroup>
      </LazyLoad>
    );
  }
}

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredProject: null,
      projects: []
    };
    this.parseWPResponse = this.parseWPResponse.bind(this);
  }
  componentDidMount() {
    const wpURL = window.location.origin.indexOf('localhost') === -1 ?
      'https://chrisvita.com/wordpress/wp-json/wp/v2/projects?_embed' :
      'http://localhost:8888/wp-json/wp/v2/projects?_embed';
    fetch(wpURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          featuredProject: this.parseWPResponse(res.shift()),
          projects: res
        });
      });
  }
  parseWPResponse(project) {
    return ({
      ...project.acf,
      images: project._embedded['wp:featuredmedia'][0].media_details.sizes,
      titlePretty: project.title.rendered
    });
  }
  render() {
    const { featuredProject } = this.state;
    const regularProjects = this.state.projects.map(project => {
      const details = this.parseWPResponse(project);
      return (
        <Col md='4' sm='12' key={details.title}>
          <Preview details={details} />
        </Col>
      );
    });

    return (
      <div>
        <h1 className='sectionHeading'>Personal projects</h1>

        <Row>
          <Col>
            {featuredProject &&
              <Preview details={featuredProject} size={'6'} />}
          </Col>
        </Row>

        <Row>
          {regularProjects}
        </Row>
      </div>
    );
  }
}


export default Projects;
