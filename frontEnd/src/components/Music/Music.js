import React, { Component } from 'react';
import LazyFadeIn from '../helper/LazyFadeIn';
import FadeIn from '../helper/FadeIn';
import { Container, Row, Col } from 'reactstrap';
import './Music.css';


const AlbumLayout = props => {
  const {
    artist_name,
    recording_title,
    genres,
    // main_text_heading,
    // main_text,
    bandcamp_album_id,
    // video,
    images
 } = props;

  return (
    <LazyFadeIn>
      <Row className='media album'>

        <Col md='4' sm='4' xs='8'>
          <div className='albumImageContainer' onClick={() => props.handleClick(bandcamp_album_id)}>
            <i className="fa fa-play-circle" id='playButton' aria-hidden="true" />
            <img className='mr-3 albumImage' src={images.medium.source_url} alt={recording_title} />
          </div>
        </Col>

        <Col md='8' sm='8' xs='12'>
          <div className='media-body'>
            <Row>
              <Col>
                <h2 className='mt-0 mb-1 title'>{artist_name}</h2>
                <h3 className='subtitle recordingTitle'>{recording_title}</h3>
                {/* <h3 className='sectionHeading'>{main_text_heading}</h3>
                <div className='bodyText' dangerouslySetInnerHTML={{ __html: main_text }} /> */}
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

const MusicText = props => (
  <div>
    <h1 className='sectionHeading'>{props.primary_heading}</h1>
    <p className='lead' dangerouslySetInnerHTML={{ __html: props.primary_text }} />
    <div className='bodyText' dangerouslySetInnerHTML={{ __html: props.secondary_text }} />
  </div>
);

class Music extends Component {
  componentDidMount() {
    if (!this.props.siteText.music) {
      this.props.fetchSiteText('additional_text', '72');
    }
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
          {this.props.siteText.music && (
            <FadeIn>
              <MusicText {...this.props.siteText.music} />
            </FadeIn>)}
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
