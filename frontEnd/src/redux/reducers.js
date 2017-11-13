import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import initialState from './initialState';
import * as types from './actionTypes';
import Raven from 'raven-js';

// Sync
export const selectedProject = (state = initialState.selectedProject, action) => {
  switch (action.type) {
    case types.MAKE_SELECTED_PROJECT:
      return action.payload;
    default:
      return state;
  }
};

export const selectedMusic = (state = initialState.selectedMusic, action) => {
  switch (action.type) {
    case types.MAKE_SELECTED_MUSIC:
      return action.payload;
    default:
      return state;
  }
};

// Async
export const siteText = (state = initialState.siteText, action) => {
  switch (action.type) {
    case types.FETCH_SITE_TEXT_SUCCEEDED:
      const { section_title } = action.payload[0];
      return { [section_title]: action.payload[0], ...state };
    default:
      return state;
  }
};

export const projects = (state = initialState.projects, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};

export const musics = (state = initialState.musics, action) => {
  switch (action.type) {
    case types.FETCH_MUSICS_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};

export const testimonial = (state = initialState.testimonial, action) => {
  switch (action.type) {
    case types.FETCH_TESTIMONIAL_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};

export const commits = (state = initialState.commits, action) => {
  switch (action.type) {
    case types.FETCH_COMMITS_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};

export const styleSheetLoaded = (state = initialState.styleSheetLoaded) => {
  const styleSheetHref = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css';
  if (document.styleSheets.length > 0 && document.styleSheets[0].href === styleSheetHref) {
    return true;
  } else {
    return state;
  }
};

export const errors = (state = initialState.errors, action) => {
  if (action.type && action.type.indexOf('FAILED') !== -1) {
    if (process.env.NODE_ENV === 'production') {
      Raven.captureException(JSON.stringify(action));
    }
    console.error(action);
    return [...state, action];
  }
  return state;
};


const rootReducer = combineReducers({
  siteText,
  selectedProject,
  projects,
  selectedMusic,
  musics,
  testimonial,
  commits,
  styleSheetLoaded,
  errors,
  routing: routerReducer
});


export default rootReducer;
