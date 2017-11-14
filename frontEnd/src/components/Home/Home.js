import React from 'react';
import FadeIn from '../helper/FadeIn';
import LazyFadeIn from '../helper/LazyFadeIn';
import { Row, Col } from 'reactstrap';
import About from './About';
import StandUp from './StandUp';
import Projects from '../Projects/Projects';
import Testimonial from './Testimonial';
import './Home.css';


const Hero = props => (
  <div className='heroBanner'>
    <div className='container-fluid'>
      <Row>
        <Col md='8' sm='12'>
          {props.styleSheetLoaded && (
            <FadeIn>
              <h1 className='display-3 heroText'>My name is Chris, and I <span>build</span> things with code.</h1>
            </FadeIn>)}
        </Col>
      </Row>
    </div>
    <div className='heroImage' />
  </div>
);

const Home = props => (
  <div>
    <Hero styleSheetLoaded={props.styleSheetLoaded} />

    <About {...props} />

    <LazyFadeIn height={600}>
      <StandUp {...props} />
    </LazyFadeIn>

    <LazyFadeIn height={1000}>
      <Projects {...props} />
    </LazyFadeIn>

    <LazyFadeIn height={500}>
      <Testimonial testimonial={props.testimonial} fetchTestimonial={props.fetchTestimonial} />
    </LazyFadeIn>
  </div>
);


export default Home;
