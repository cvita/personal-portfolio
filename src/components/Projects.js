import React from 'react';
import laptopImage from '../assets/laptop.png';
import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container, Row, Col, Card, CardTitle, CardText, CardDeck, CardBody, CardLink } from 'reactstrap';
import './Projects.css';


function ScreenshotInLaptop(props) {
  const { images, title } = props;
  return (
    <div className='screenshotInLaptop'>
      <img className='laptopImage' src={laptopImage} alt="laptop" />
      <div className='projectImageContainer'>
        <img className='projectImage' src={images.medium.source_url} alt={title + ' screenshot'} />
      </div>
    </div>
  );
}

class Preview extends React.Component {
  render() {
    const { title, titlePretty, github_url, demo_url, short_description, tech_stack, images } = this.props.details;

    return (

      <Card className='preview'>

        <CardBody>
          <CardTitle className='previewTitle'>{titlePretty}</CardTitle>
        </CardBody>

        <Container className='previewImageContainer'>
          <Row>
            <Col sm='6' xs='12'>
              <ScreenshotInLaptop images={images} title={title} />
            </Col>
            <Col sm='6' xs='12'>
              <div className='techStack'>
                <h5>{tech_stack}</h5>
              </div>
            </Col>
          </Row>
        </Container>

        <CardBody>
          <CardText className='shortDescription'>{short_description}</CardText>
          <CardLink href={demo_url}>Demo</CardLink>
          <CardLink href={github_url}>GitHub</CardLink>
        </CardBody>

      </Card>

    );
  }
}

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
  }
  componentDidMount() {
    const wpURL = window.location.origin.indexOf('localhost') === -1 ?
      'https://chrisvita.com/wordpress/wp-json/wp/v2/projects?_embed' :
      'http://localhost:8888/wp-json/wp/v2/projects?_embed';
    fetch(wpURL)
      .then(res => res.json())
      .then(res => this.setState({ projects: res }));
  }
  render() {
    const myProjects = this.state.projects.map((project, i) => {
      const details = {
        ...project.acf,
        images: project._embedded['wp:featuredmedia'][0].media_details.sizes,
        titlePretty: project.title.rendered
      };
      return (
        <LazyLoad key={`${details.title}_${i}`}>
          <CSSTransitionGroup
            transitionName='fadeInOnLoad'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <Preview details={details} />
          </CSSTransitionGroup>
        </LazyLoad>
      );
    });
    return (
      <div>
        <h1 className='heading'>Personal projects</h1>
        <CardDeck>
          {myProjects}
        </CardDeck>
      </div>
    );
  }
}


export default Projects;
