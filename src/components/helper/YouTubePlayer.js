import React from 'react';
import './YouTubePlayer.css';


function YouTubePlayer(props) {
  const { videoId, title } = props;
  const src = 'https://www.youtube.com/embed/' + videoId + '?enablejsapi=1';

  return (
    <div className='videoWrapper'>
      {videoId &&
        <iframe
          id='player'
          title={title}
          type='text/html'
          src={src}
          frameBorder='0'
          allowFullScreen
        />}
    </div>
  );
}


export default YouTubePlayer;
