import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';


function NoMatch404({ location }) {
  return (
    <div className='text-center'>
      <Alert color='danger'>Path <code>{location.pathname}</code> not found.</Alert>
      <p className='lead text-muted'>Let's try going back <Link to='/'>home</Link>.</p>
    </div>
  );
}


export default NoMatch404;
