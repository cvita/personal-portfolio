import React from 'react';
import { Row, Col } from 'reactstrap';
import About from './About';
import './Home.css';



const Home = () => (
  <div>
    <div className='heroBanner'>
      <div className='container-fluid'>
        <Row>
          <Col md='8' sm='12'>
            <h1 className='display-3 heroText'>My name is Chris, and I <span>build</span> things with code.</h1>
          </Col>
        </Row>
      </div>
      <div className='heroImage' />
    </div>

    <About />
    
  </div>
);


export default Home;
