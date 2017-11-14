import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import List from '../helper/List';


const AboutLayout = props => {
  const {
    primary_heading,
    primary_text,
    secondary_text,
    tertiary_heading,
    tertiary_text,
    quaternary_heading,
    quaternary_text,
    list_1
    } = props.text;

  return (
    <Container className='about'>
      <Row>
        <Col md='7' xs='12'>
          <h3 className='sectionHeading'>{primary_heading}</h3>
          <div className='lead' dangerouslySetInnerHTML={{ __html: primary_text }} />
          <div className='bodyText renderedHTML' dangerouslySetInnerHTML={{ __html: secondary_text }} />
        </Col>

        <Col />

        <Col md='4' xs='12'>
          <h3 className='sectionHeading'>{tertiary_heading}</h3>
          <div className='bodyText' dangerouslySetInnerHTML={{ __html: tertiary_text }} />
          <List list={list_1} />

          <h3 className='sectionHeading'>{quaternary_heading}</h3>
          <div className='bodyText renderedHTML' dangerouslySetInnerHTML={{ __html: quaternary_text }} />
        </Col>
      </Row>
    </Container>
  );
};


class About extends Component {
  componentDidMount() {
    if (!this.props.siteText.introduction) {
      this.props.fetchSiteText('additional_text', '69');
    }
  }
  render() {
    return (
      <div>
        {this.props.siteText.introduction && (
          <AboutLayout text={this.props.siteText.introduction} />)}
      </div>
    );
  }
}

export default About;
