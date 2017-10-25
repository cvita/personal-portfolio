import React, { Component } from 'react';
import { Row, Col, Collapse, Alert, Button } from 'reactstrap';
import './Player.css';


class Player extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      collapse: false,
      visible: true
    };
  }
  componentDidMount() {
    this.setState({ collapse: true });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.albumId !== nextProps.albumId) {
      this.setState({ collapse: true });
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  onDismiss() {
    this.setState({ visible: false });
  }
  render() {
    const { albumId, size, tracklist, artwork } = this.props;
    const showHide = this.state.collapse ?
      <i className='fa fa-angle-double-down' aria-hidden='true' /> :
      <i className='fa fa-angle-double-up' aria-hidden='true' />;
    return (
      <div className='player'>
        <div className='container-fluid'>
          <Row>

            <Col sm='8' xs='12'>
              <Collapse isOpen={this.state.collapse}>
                <iframe
                  className='bandcampIframe'
                  autoPlay
                  title={albumId}
                  src={`https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=${size}/bgcol=ffffff/linkcol=0687f5/tracklist=${tracklist}/artwork=${artwork}/transparent=true/`}
                  seamless>
                </iframe>
              </Collapse>
            </Col>

            <Col sm='4' xs='12'>
              <div className='playerRight'>
                <Alert className='infoAlert' isOpen={this.state.visible} color='info'>
                  <p>This player will remain available while you browse.</p>
                  <Button onClick={this.onDismiss} color='primary'>Got it!</Button>
                </Alert>
                <Button className='showHideButton' onClick={this.toggle} color='secondary' >{showHide}</Button>
              </div>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}


export default Player;
