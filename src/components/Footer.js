import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';


const Footer = () => (
  <div className='footer'>
    <Container>
      <Row>
        <Col sm='6' xs='12'>
          <div className='contactInfo'>
            <ul className='footerList'>
              <li><a href='mailto:chris.vita@gmail.com'>chris.vita@gmail.com</a></li>
              <li><a href='tel:360-540-3071'>360.540.3071</a></li>
              <li>Portland, OR</li>
            </ul>
          </div>
        </Col>

        <Col sm='6' xs='12'>
          <div className='socialInfo'>
            <ul className='footerList'>
              <li>
                <a href='https://github.com/VitaC123'>
                  {/* Span text to comply with accessability */}
                  <i className="fa fa-github" aria-hidden="true"></i><span>GitHub</span>
                </a>
              </li>
              <li>
                <a href='https://www.linkedin.com/in/chrisvita1'>
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i><span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);


export default Footer;
