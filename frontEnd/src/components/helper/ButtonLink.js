import React from 'react';
import { Button } from 'reactstrap';


const ButtonLink = props => (
  <a href={props.to}>
    <Button
      className={props.styleClasses}
      color={props.color}
      style={{ cursor: 'pointer' }}
    >
      <i className={`fa ${props.faIcon}`} aria-hidden='true' />
      {props.text}
    </Button>
  </a>
);


export default ButtonLink;
