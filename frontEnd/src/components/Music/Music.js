import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LazyFadeIn from '../helper/LazyFadeIn';
import './Music.css';


const AlbumLayout = props => {
  const { artist_name, titlePretty, description, genres, recording_title, images, bandcamp_album_id } = props;
  return (
    <LazyFadeIn>
      <Row className='media album'>

        <Col md='4' sm='4' xs='8'>
          <div className='albumImageContainer' onClick={() => props.handleClick(bandcamp_album_id)}>
            <i className="fa fa-play-circle playButton" aria-hidden="true" />
            <img className='mr-3 albumImage' src={images.medium_large.source_url} alt={titlePretty} />
          </div>
        </Col>

        <Col md='8' sm='8' xs='12'>
          <div className='media-body'>
            <Row>
              <Col>
                <h2 className='mt-0 mb-1 title artistAndTitle'>
                  {artist_name} <span className='subtitle'>{recording_title}</span>
                </h2>
                <p className='bodyText'>{description}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='subtitle albumDetails'>
                  <ul className='list-unstyled genreList'>
                    {genres.split(', ').map((genre, i) => <li key={bandcamp_album_id + '_' + i}>{genre}</li>)}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

      </Row>
    </LazyFadeIn>
  );
}

class Music extends Component {
  componentDidMount() {
    if (this.props.musics.length === 0) {
      this.props.fetchMusics();
    }
  }
  selectMusic(albumId) {
    this.props.makeSelectedMusic({
      albumId: albumId,
      size: 'large',
      tracklist: 'false',
      artwork: 'small'
    });
  }
  render() {
    const albums = this.props.musics;

    return (
      <Container>
        <Col>
          <h1 className='sectionHeading'>Albums</h1>
          <p className='lead'>When I'm not writing code, I write songs.</p>
          <p className='bodyText'>I've lead many recording projects as a lead singer, guitarist, and recording engineer. Here, you can listen to some of my favorites.</p>
        </Col>

        {albums.length > 0 && (
          albums.map(album => {
            return (
              <AlbumLayout
                {...album}
                handleClick={albumId => this.selectMusic(albumId)}
                key={album.bandcamp_album_id}
              />
            );
          }))}

      </Container>
    );
  }
}


export default Music;
