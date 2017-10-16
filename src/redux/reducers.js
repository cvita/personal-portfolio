import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import initialState from './initialState';
import * as types from './actionTypes';


// Sync
const selectedProject = (state = initialState.selectedProject, action) => {
  switch (action.type) {
    case types.MAKE_SELECTED_PROJECT:
      return action.payload;
    default:
      return state;
  }
};

// Async
const projects = (state = initialState.projects, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};

const errors = (state = initialState.errors, action) => {
  if (action.type.indexOf('FAILED') !== -1) {
    return [...state, action];
  }
  return state;
};

const rootReducer = combineReducers({
  selectedProject,
  projects,
  errors,
  routing: routerReducer
});


export default rootReducer;
