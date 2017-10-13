import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Projects from './Projects';
import './Home.css';


function Home() {
  return (
    <div>
      <div className='heroBanner'>
        <div className='heroImage' />
      </div>

      <Container>
        <Row>
          <Col md='8' sm='12'>
            <h1 className='display-3 heroText'>My name is Chris, and I <span>build</span> things with code.</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className='lead text-center introText'>
              I'm a husband, father, guitar player, pizza-chef, and <strong>Full Stack JavaScript Developer</strong>.
              <br /><br />
              Check out some of my work below, and always feel free to <a href='mailto:chris.vita@gmail.com'>get in touch</a>.
            </p>
          </Col>
        </Row>

        <Projects />

        <div className='stubFooter' />
      </Container>
    </div>
  );
}


export default Home;
