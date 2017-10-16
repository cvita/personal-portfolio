import * as types from './actionTypes';

// Sync
export const makeSelectedProject = details => ({
  type: types.MAKE_SELECTED_PROJECT,
  payload: details
});

// Async
export const fetchProjects = () => ({
  type: types.FETCH_PROJECTS_REQUESTED,
  payload: null
});
