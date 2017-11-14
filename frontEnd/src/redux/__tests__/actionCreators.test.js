import * as actions from '../actionCreators';
import * as types from '../actionTypes';


describe('action creators', () => {
  it('should create an action to fetch site text from WP', () => {
    const expectedAction = {
      type: types.FETCH_SITE_TEXT_REQUESTED,
      payload: ['additional_text', '69', false]
    };
    expect(actions.fetchSiteText('additional_text', '69')).toEqual(expectedAction);
  });

  it('should create an action to fetch projects from WP', () => {
    const expectedAction = {
      type: types.FETCH_PROJECTS_REQUESTED,
      payload: 'projects'
    };
    expect(actions.fetchProjects()).toEqual(expectedAction);
  });

  it('should create an action to fetch musics from WP', () => {
    const expectedAction = {
      type: types.FETCH_MUSICS_REQUESTED,
      payload: 'musics'
    };
    expect(actions.fetchMusics()).toEqual(expectedAction);
  });

  it('should create an action to select a project', () => {
    const input = {};
    const expectedAction = {
      type: types.MAKE_SELECTED_PROJECT,
      payload: input
    };
    expect(actions.makeSelectedProject(input)).toEqual(expectedAction);
  });

  it('should create an action to select a music', () => {
    const input = {};
    const expectedAction = {
      type: types.MAKE_SELECTED_MUSIC,
      payload: input
    };
    expect(actions.makeSelectedMusic(input)).toEqual(expectedAction);
  });

  it('should create an action to fetch testimonial', () => {
    const expectedAction = {
      type: types.FETCH_TESTIMONIAL_REQUESTED,
      payload: ['testimonial', true]
    };
    expect(actions.fetchTestimonial('testimonial')).toEqual(expectedAction);
  });

  it('should create an action to fetch commits', () => {
    const expectedAction = {
      type: types.FETCH_COMMITS_REQUESTED,
      payload: 3
    };
    expect(actions.fetchCommits()).toEqual(expectedAction);
  });

  it('should create an action to refresh stylesheet status', () => {
    const expectedAction = {
      type: types.REFRESH_STYLESHEET_STATUS,
      payload: null
    };
    expect(actions.refreshStyleSheetStatus()).toEqual(expectedAction);
  });
});
