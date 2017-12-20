import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets';
import { Container, Row, Col, Button } from 'reactstrap';
import ErrorBoundary from '../helper/ErrorBoundary';
import './StandUp.css';


class TwitterTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineLoaded: false,
      tweetLimit: 1,
      additionalOptions: ' noborders nofooter'
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleLoad() {
    this.setState({ timelineLoaded: true });
  }
  handleClick() {
    this.setState({ tweetLimit: null, additionalOptions: '' });
  }
  render() {
    const { tweetLimit, timelineLoaded, additionalOptions } = this.state;
    const timelineOptions = {
      theme: 'light',
      height: 600,
      chrome: 'noheader noscrollbar transparent' + additionalOptions,
      linkColor: "#287EF7",
      tweetLimit: tweetLimit
    };
    return (
      <div>
        <h1 className='sectionHeading standUpHeading'>Daily stand-up</h1>

        <Timeline
          dataSource={{ sourceType: 'profile', screenName: 'cvpdx' }}
          options={timelineOptions}
          onLoad={this.handleLoad}
        />

        {timelineLoaded && tweetLimit === 1 && (
          <Button className='twitterTimelineButton' onClick={this.handleClick} block outline size='sm'>
            <i className='fa fa-angle-double-down' aria-hidden='true' />
          </Button>)}
      </div>
    );
  }
}

const RecentCommits = props => {
  const recentCommits = props.commits.map(commit => {
    const mainMessageIndex = commit.message.indexOf('\n');
    const mainMessage = mainMessageIndex > -1 ?
      commit.message.slice(0, mainMessageIndex) :
      commit.message;
    const date = new Date(commit.date).toDateString().slice(4, -5);
    return (
      <li key={commit.date}>
        <p>
          <span className='subtitle commitsDate'>{date}</span><br />
          <code><a className='linkUnstyled bodyText' href={commit.url}>{mainMessage}</a></code>
        </p>
      </li>
    );
  });
  return (
    <div>
      <h1 className='sectionHeading standUpHeading'>Last 3 commits</h1>
      <ul className='list-unstyled'>{recentCommits}</ul>
    </div>
  );
};

class StandUp extends Component {
  componentDidMount() {
    if (this.props.commits.commits.length === 0) {
      this.props.fetchCommits();
    }
  }
  render() {
    const { commits } = this.props;
    const timelineError = "There was a problem embedding the <i>daily stand-ups</i> from Twitter, but you can still <a href='https://twitter.com/cvpdx'>view them here</a>.";
    return (
      <div className='standUp'>
        <Container>
          <Row>
            <Col md='7' xs='12'>
              <ErrorBoundary errorHtml={timelineError}>
                <TwitterTimeline />
              </ErrorBoundary>
            </Col>

            <Col />
            {commits.length > 0 && (
              <Col md='4' xs='12'>
                <RecentCommits commits={this.props.commits} />
              </Col>)}
          </Row>
        </Container>
      </div>
    );
  }
}


export default StandUp;
