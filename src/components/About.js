import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './About.css';


const About = () => {
  const technicalTools = [
    'ES6+ JavaScript',
    'React-Redux',
    'Node.js',
    'MongoDB',
    'Jest'
  ];

  return (
    <Container className='about'>
      <Row>
        <Col md='7' xs='12'>
          <h3 className='sectionHeading'>About</h3>
          <p className='lead'>I'm a <strong>full stack JavaScript developer</strong>, currently looking for opportunities to contribute to a focused and exciting team.</p>

          <p className='bodyText'>I love building useful web applications, utilizing the most appropriate web technologies. I strive for code that's easy to maintain, and consider performance throughout the development process. I pivoted to the web from a long career as an audio mastering engineer, and continue to operate with an emphasis on building long lasting client relationships.</p>

          <h3 className='sectionHeading selfTaught'>Self-taught</h3>
          <p className='bodyText'>Being self taught means I know how to solve problems without specific instructions. One year ago, I could not write code. Now I can.</p>

          <p className='bodyText getInTouch'>Check out some of my work below, listen to some <Link to='/music'>music</Link> if you like, and feel free to <a href='mailto:chris.vita@gmail.com'>get in touch</a>!</p>
        </Col>

        <Col />

        <Col md='4' xs='12'>
          <h3 className='sectionHeading'>Tools</h3>
          <p className='bodyText'>I'm currently focused on web development using a MERN stack, but I'm always excited to learn more!</p>
          <ul className='list-unstyled subtitle toolsList'>
            {technicalTools.map(tool => <li key={tool}><i className='fa fa-check-circle' aria-hidden='true' /> {tool}</li>)}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};


export default About;
