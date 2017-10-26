import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import About from './About';
import './Home.css';


class Home extends PureComponent {
  componentDidMount() {
    if (!this.props.home) {
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

        {this.props.introduction &&
          <About text={this.props.introduction} />}

      </div>
    );
  }
}


export default Home;
