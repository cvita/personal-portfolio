import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import List from '../helper/List';
import './About.css';


const About = props => {
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
          <div className='bodyText renderedText' dangerouslySetInnerHTML={{ __html: secondary_text }} />
        </Col>

        <Col />

        <Col md='4' xs='12'>
          <h3 className='sectionHeading'>{tertiary_heading}</h3>
          <div className='bodyText' dangerouslySetInnerHTML={{ __html: tertiary_text }} />
          <List classes='list-unstyled subtitle toolsList' list={list_1} />

          <h3 className='sectionHeading'>{quaternary_heading}</h3>
          <div className='bodyText renderedText' dangerouslySetInnerHTML={{ __html: quaternary_text }} />
        </Col>
      </Row>
    </Container>
  );
};


export default About;
