import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LazyFadeIn from '../helper/LazyFadeIn';
import './Testimonial.css';


const Testimony = props => {
  const { name, linkedin_url, organization, organization_url, lead_text, main_text, images } = props;

  return (
    <blockquote className='jumbotron testimonialContainer'>
      <Row>
        <Col xl='12' md='4' xs='12'>
          <LazyFadeIn>
            <img className='testimonialImage' src={images.medium.source_url} alt={name} />
          </LazyFadeIn>
          <h3 className='subtitle testimonialNameAndOrg'>
            <a className='linkUnstyled' href={linkedin_url}>{name}</a>
            <br />
            <cite title={organization}>
              <a className='linkUnstyled' href={organization_url}>{organization}</a>
            </cite>
          </h3>
        </Col>

        <Col xl='12' md='8' xs='12'>
          <p className='lead' dangerouslySetInnerHTML={{ __html: lead_text }} />
          <p className='bodyText' dangerouslySetInnerHTML={{ __html: main_text }} />
        </Col>
      </Row>
    </blockquote>
  );
};

class Testimonial extends Component {
  componentDidMount() {
    if (this.props.testimonial.length === 0) {
      this.props.fetchTestimonial('testimonials');
    }
  }
  render() {
    const googleReviewsUrl = 'https://www.google.com/search?q=vita+mastering+portland&ludocid=14393433041976452620#lrd=0x0:0xc7bfbf178d60660c,1';
    return (
      <Container className='testimonialSection'>
        {this.props.testimonial.length > 0 && (
          <div>
            <h1 className='sectionHeading'>Testimonial</h1>
            <p className='lead'>What past managers and clients are saying.</p>
            <Row>
              {this.props.testimonial.map(testimony => {
                return (
                  <Col xl='6' xs='12' key={testimony.name}>
                    <Testimony {...testimony} />
                  </Col>
                );
              })}
            </Row>

            <Row>
              <Col>
                <p className='lead text-center'>Read client reviews from my former audio mastering business <a href={googleReviewsUrl}>here</a>.</p>
              </Col>
            </Row>

          </div>)}
      </Container>
    );
  };
}


export default Testimonial;
