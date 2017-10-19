import React, { Component } from 'react';
import { Row, Col, Collapse, Button } from 'reactstrap';
import './Player.css';


class Player extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
    const { albumId, size, tracklist, artwork } = this.props;
    const showHide = this.state.collapse ?
      <i className='fa fa-angle-double-down' aria-hidden='true' /> :
      <i className='fa fa-angle-double-up' aria-hidden='true' />;
    return (
      <div className='player'>
        <Row>
          <Col sm='8' xs='12'>
            <Collapse isOpen={this.state.collapse}>
              <iframe
                className='bandcampIframe'
                title={albumId}
                src={`https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=${size}/bgcol=ffffff/linkcol=0687f5/tracklist=${tracklist}/artwork=${artwork}/transparent=true/`}
                seamless>
              </iframe>
            </Collapse>
          </Col>
          <Col sm='4' xs='12'>
            <Button className='showHideButton' onClick={this.toggle} color='secondary' >{showHide}</Button>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Player;
