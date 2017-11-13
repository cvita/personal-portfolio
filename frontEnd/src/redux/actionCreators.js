import * as types from './actionTypes';


const defaultPlayerProps = {
  albumId: '421650746',
  size: 'large',
  tracklist: 'false',
  artwork: 'small'
};

// Sync
export const makeSelectedProject = details => ({
  type: types.MAKE_SELECTED_PROJECT,
  payload: details
});

export const makeSelectedMusic = (playerProps = defaultPlayerProps) => ({
  type: types.MAKE_SELECTED_MUSIC,
  payload: playerProps
});

// Async
export const fetchSiteText = (customPostType, postId, embed = false) => ({
  type: types.FETCH_SITE_TEXT_REQUESTED,
  payload: [customPostType, postId, embed]
});

export const fetchProjects = () => ({
  type: types.FETCH_PROJECTS_REQUESTED,
  payload: 'projects'
});

export const fetchMusics = () => ({
  type: types.FETCH_MUSICS_REQUESTED,
  payload: 'musics'
});

export const fetchTestimonial = (customPostType, embed = true) => ({
  type: types.FETCH_TESTIMONIAL_REQUESTED,
  payload: [customPostType, embed]
});

export const fetchCommits = (maxResults = 5) => ({
  type: types.FETCH_COMMITS_REQUESTED,
  payload: maxResults
});
