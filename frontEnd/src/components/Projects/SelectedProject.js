import React, { Component } from 'react';
import initialState from '../../redux/initialState';
import { Row, Col } from 'reactstrap';
import LazyFadeIn from '../helper/LazyFadeIn';
import ButtonLink from '../helper/ButtonLink';
import List from '../helper/List';
import YouTubePlayer from '../helper/YouTubePlayer';
import './SelectedProject.css';


const SelectedProjectLayout = props => {
  const {
    title_pretty,
    title,
    images,
    short_description,
    long_description_heading,
    long_description,
    secondary_text_heading,
    secondary_text,
    secondary_image,
    secondary_image_caption,
    gif,
    secondary_gif,
    github_url,
    demo_url,
    tech_stack,
    travis,
    video_heading,
    video,
    project_embed
    } = props;

  const travisUrl = `https://travis-ci.org/VitaC123/${title}`;
  const travisBadge = travis ?
    <span> <a href={travisUrl}><img src={`${travisUrl}.svg?branch=master`} alt='travis-ci' /></a></span> :
    '';

  return (
    <div className='selectedProject'>
      <Row>
        <Col>
          <h1 className='title'>{title_pretty}{travisBadge}</h1>
          <p className='subtitle lead' dangerouslySetInnerHTML={{ __html: short_description }} />
        </Col>
      </Row>

      <Row>
        <Col>
          <img className='img-fluid featuredImage' src={images.large.source_url} alt={title} />
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className='sectionHeading'>View</h3>
          <ButtonLink
            to={github_url}
            styleClasses='viewButton'
            color='link'
            faIcon='fa-github'
            text=' Source'
          />
          <ButtonLink
            to={demo_url}
            styleClasses='viewButton'
            color='link'
            faIcon='fa-desktop'
            text=' Demo'
          />
        </Col>
      </Row>

      <Row>
        <Col md='7' xs='12'>
          {long_description &&
            <div>
              <h3 className='sectionHeading'>{long_description_heading}</h3>
              <div className='bodyText' dangerouslySetInnerHTML={{ __html: long_description }} />
            </div>}


          {video.length > 0 &&
            <div>
              <h3 className='sectionHeading'>{video_heading}</h3>
              <YouTubePlayer videoId={video} title={title} />
            </div>}

          {gif &&
            <img className='img-fluid secondaryImage' src={gif.url} alt={title} />}

          {secondary_image &&
            <div>
              <img className='img-fluid secondaryImage' src={secondary_image.sizes.large} alt={title} />
              <p className='secondaryImageCaption' dangerouslySetInnerHTML={{ __html: secondary_image_caption }} />
            </div>}

        </Col>

        <Col />

        <Col md='4' xs='12'>
          <h3 className='sectionHeading'>Tools used</h3>
          <List list={tech_stack} />
        </Col>
      </Row>

      {secondary_text.length > 0 &&
        <Row>
          <Col md='7' xs='12'>
            <h3 className='sectionHeading'>{secondary_text_heading}</h3>
            <div className='bodyText' dangerouslySetInnerHTML={{ __html: secondary_text }} />

            {secondary_gif &&
              <img className='img-fluid secondaryImage' src={secondary_gif.url} alt={title} />}
          </Col>
          <Col />
        </Row>}

      {project_embed && (
        <Row>
          <Col>
            <h3 className='sectionHeading'>Try it out</h3>
            <div dangerouslySetInnerHTML={{ __html: project_embed }} />
          </Col>
        </Row>)}

    </div>
  );
};

class SelectedProject extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const projectTitleFromRouting = this.props.routing.location.pathname.slice(10);
    const { projects } = this.props;
    const selectedProjectIndex = projects.findIndex(project => project.title === projectTitleFromRouting);
    this.props.makeSelectedProject(projects[selectedProjectIndex]);
  }
  componentWillUnmount() {
    this.props.makeSelectedProject(initialState.selectedProject);
  }
  render() {
    return (
      <div>
        {this.props.selectedProject.title &&
          <LazyFadeIn offset={0}>
            <SelectedProjectLayout {...this.props.selectedProject} />
          </LazyFadeIn>}
      </div>
    );
  }
}


export default SelectedProject;
