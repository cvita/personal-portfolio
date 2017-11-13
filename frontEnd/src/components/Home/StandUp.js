import React, { Component } from 'react';
import Script from 'react-load-script';
import { Container, Row, Col, Alert, Badge } from 'reactstrap';
import './StandUp.css';


const TwitterTimeline = props => (
  <div>
    {props.scriptError &&
      <Alert color='danger'>
        <p>There was a problem embedding the <i>daily stand-ups</i> from Twitter, but you can still <a href='https://twitter.com/cvpdx'>view them here</a>.</p>
      </Alert>}

    {!props.scriptError && (
      <div>
        <div className='twitterHeader' />
        <div className='twitterTimelineContainer'>
          <a
            className='twitter-timeline'
            data-height='600'
            data-theme='light'
            href='https://twitter.com/cvpdx?ref_src=twsrc%5Etfw'
          >
            Tweets by cvpdx
          </a>
        </div>
        {props.scriptLoaded &&
          <div className='twitterFooter' />}
      </div>)}
  </div>
);

const RecentCommits = props => {
  const { commits } = props;
  return (
    <div>
      <h1 className='sectionHeading'>Recent commits</h1>
      <ul className='list-unstyled'>
        {commits.map(commit => {
          const mainMessageIndex = commit.message.indexOf('\n');
          const mainMessage = mainMessageIndex > -1 ?
            commit.message.slice(0, mainMessageIndex) :
            commit.message;
          return (
            <li key={commit.date}>
              <Badge className='subtitle' pill color='light'>{new Date(commit.date).toDateString()}</Badge>
              <p><a className='linkUnstyled' href={commit.url}>{mainMessage}</a></p>
            </li>
          );
        })}
      </ul>
    </div>
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
  componentDidMount() {
    if (this.props.commits.commits.length === 0) {
      this.props.fetchCommits();
    }
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
    const { scriptCreated } = this.state;
    const { commits } = this.props.commits;
    return (
      <div className='standUp'>
        <Script
          url='https://platform.twitter.com/widgets.js'
          attributes={{ charset: 'utf-8' }}
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Container>
          <Row>
            <Col md='7' xs='12'>
              <h1 className='sectionHeading standUpHeading'>Daily stand-up</h1>
              {scriptCreated && (
                <TwitterTimeline
                  scriptError={this.state.scriptError}
                  scriptLoaded={this.state.scriptLoaded}
                />)}
            </Col>

            <Col />
            {commits.length > 0 && (
              <Col md='4' xs='12'>
                <RecentCommits {...this.props.commits} />
              </Col>)}
          </Row>
        </Container>
      </div>
    );
  }
}


export default StandUp;
