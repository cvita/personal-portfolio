import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import About from './About';
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
                <h1 className='display-3 heroText'>My name is Chris, and I <span>build</span> things with code.</h1>
              </Col>
            </Row>
          </div>
          <div className='heroImage' />
        </div>

        {this.props.siteText.introduction &&
          <About text={this.props.siteText.introduction} />}

        {this.props.children}

        <Testimonial testimonial={this.props.testimonial} fetchTestimonial={this.props.fetchTestimonial} />

      </div>
    );
  }
}


export default Home;
