import React from 'react';
import { Container, Row, Col, Button, Card, CardTitle, CardText, CardBody, CardImgOverlay } from 'reactstrap';
import LazyFadeIn from '../helper/LazyFadeIn';
import laptopImage from '../../assets/laptop.png';
import './Preview.css';


const ScreenshotInLaptop = props => (
  <div className='screenshotInLaptop'>
    <img className='laptop' src={laptopImage} alt='laptop' />
    <div className='screenshotContainer'>
      <img className='screenshot' src={props.images.medium.source_url} alt={props.title + ' screenshot'} />
    </div>
  </div>
);

const Preview = props => {
  const { title, title_pretty, short_description, tech_stack, images } = props.details;
  const outerColSize = props.featured ? '12' : '4';
  const innerColSize = props.featured ? '6' : '12';
  return (
    <Col md={outerColSize} xs='12'>
      <LazyFadeIn offset={500}>
        <Card className='preview'>
          <CardBody>
            <CardTitle className='previewTitle'>{title_pretty}</CardTitle>
          </CardBody>

          <Container className='previewImageContainer'>
            <Row>
              <Col lg='6' md={innerColSize} xs={'12'}>
                <ScreenshotInLaptop images={images} title={title} />
              </Col>
              <Col lg='6' md={innerColSize} xs={'12'}>
                <div className='previewTechStack subtitle'>
                  <h5>{tech_stack}</h5>
                </div>
              </Col>
            </Row>
          </Container>

          <CardBody>
            <CardText className='previewShortDescription'>{short_description}</CardText>
          </CardBody>

          <CardImgOverlay className='previewCardImgOver'>
            <div className='previewOverlayBackground' onClick={props.handleClick}>
              <Button className='previewSelect' color='secondary' outline>Read more</Button>
            </div>
          </CardImgOverlay>

        </Card>
      </LazyFadeIn>
    </Col>
  );
}


export default Preview;
