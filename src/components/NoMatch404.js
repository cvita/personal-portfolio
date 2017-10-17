import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';


const NoMatch404 = ({ location }) => {
  const reversedLocation = location.pathname.split('').reverse('').join('');
  const oneStepBack = location.pathname.slice(0, -(reversedLocation.indexOf('/') + 1));

  return (
    <div className='text-center'>
      <h1 className='lead'>
        <Alert color='danger'><strong>Error:</strong> path <code>{location.pathname}</code> not found.</Alert>
        <Link to={oneStepBack}>Let's try going one step back.</Link>
      </h1>
    </div>
  );
};


export default NoMatch404;
