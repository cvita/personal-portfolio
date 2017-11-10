import React, { Component } from 'react';
import Script from 'react-load-script';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import './StandUp.css';


const Twitter = props => (
  <div>
    {props.twitterError &&
      <Alert color='danger'>
        <p>There was a problem embedding the <i>daily stand-ups</i> from Twitter, but you can still <a href='https://twitter.com/cvpdx'>view it</a>.</p>
      </Alert>}

    {!props.twitterError && (
      <div>
        <div className='twitterContainer' />
        <a
          className="twitter-timeline"
          data-height="600"
          data-theme="dark"
          href="https://twitter.com/cvpdx?ref_src=twsrc%5Etfw"
        >
          Tweets by cvpdx
        </a>
        <div className='twitterFooter' />
      </div>)}
  </div>
);

const StandUpLayout = props => {

  return (
    <Container>
      <Row>
        <Col md='7' xs='12'>
          <h1 className='sectionHeading standUpHeading'>Daily stand-up</h1>
          <Twitter twitterError={props.twitterError} />
        </Col>

        <Col />

        <Col md='4' xs='12'>
          <h1 className='sectionHeading'>Placeholder section</h1>
          <p>Perhaps display GitHub latest activity</p>
        </Col>

      </Row>
    </Container>
  );
};


class StandUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptCreated: false,
      scriptError: false,
      scriptLoaded: false
    };
  }
  handleScriptCreate() {
    this.setState({ scriptCreated: true });
  }
  handleScriptError() {
    this.setState({ scriptError: true });
  }
  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }
  render() {
    return (
      <div className='standUp'>
        <Script
          url='https://platform.twitter.com/widgets.js'
          attributes={{ charset: 'utf-8' }}
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        {this.state.scriptCreated &&
          <StandUpLayout twitterError={this.state.scriptError} />}
      </div>
    );
  }
}


export default StandUp;
