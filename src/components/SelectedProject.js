import React from 'react';


function SelectedProject(props) {
  const { title, titlePretty, images } = props;
  return (
    <div>
      <h1>{titlePretty}</h1>
      <img src={images.medium.source_url} alt={title} />
    </div>
  );
}


export default SelectedProject;
