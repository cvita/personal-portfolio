import React from 'react';
import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';


const LazyFadeIn = props => (
  <LazyLoad>
    <CSSTransitionGroup
      transitionName='fadeInOnLoad'
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>

      {props.children}

    </CSSTransitionGroup>
  </LazyLoad>
);


export default LazyFadeIn;
