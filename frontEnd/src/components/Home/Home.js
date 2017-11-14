import React, { Component } from 'react';
import FadeIn from '../helper/FadeIn';
import LazyFadeIn from '../helper/LazyFadeIn';
import { Row, Col } from 'reactstrap';
import About from './About';
import StandUp from './StandUp';
import Testimonial from './Testimonial';
import './Home.css';


class Home extends Component {
  componentDidMount() {
    if (!this.props.siteText.introduction) {
      this.props.fetchSiteText('additional_text', '69');
    }
  }
  render() {
    return (
      <div>
        <div className='heroBanner'>
          <div className='container-fluid'>
            <Row>
              <Col md='8' sm='12'>
                {this.props.styleSheetLoaded && (
                  <FadeIn>
                    <h1 className='display-3 heroText'>My name is Chris, and I <span>build</span> things with code.</h1>
                  </FadeIn>)}
              </Col>
            </Row>
          </div>
          <div className='heroImage' />
        </div>

        {this.props.siteText.introduction &&
         <LazyFadeIn>
            <About text={this.props.siteText.introduction} />
          </LazyFadeIn>}

        <LazyFadeIn height={600}>
          <StandUp {...this.props} />
        </LazyFadeIn>

        <LazyFadeIn>
          {this.props.children}
        </LazyFadeIn>

        <LazyFadeIn>
          <Testimonial testimonial={this.props.testimonial} fetchTestimonial={this.props.fetchTestimonial} />
        </LazyFadeIn>
      </div>
    );
  }
}


export default Home;
