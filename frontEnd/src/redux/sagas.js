import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from './actionTypes';
import wp from '../client/wp';
import gitHub from '../client/gitHub';


export function* fetchSiteText(action) {
  try {
    const post = yield call(wp.fetchPosts, ...action.payload);
    yield put({ type: types.FETCH_SITE_TEXT_SUCCEEDED, payload: post });
  } catch (e) {
    yield put({ type: types.FETCH_SITE_TEXT_FAILED, message: e.message });
  }
}

export function* fetchProjects(action) {
  try {
    const projects = yield call(wp.fetchPosts, action.payload);
    yield put({ type: types.FETCH_PROJECTS_SUCCEEDED, payload: projects });
  } catch (e) {
    yield put({ type: types.FETCH_PROJECTS_FAILED, message: e.message });
  }
}

export function* fetchMusics(action) {
  try {
    const musics = yield call(wp.fetchPosts, action.payload);
    yield put({ type: types.FETCH_MUSICS_SUCCEEDED, payload: musics });
  } catch (e) {
    yield put({ type: types.FETCH_MUSICS_FAILED, message: e.message });
  }
}

export function* fetchTestimonial(action) {
  try {
    const testimonial = yield call(wp.fetchPosts, ...action.payload);
    yield put({ type: types.FETCH_TESTIMONIAL_SUCCEEDED, payload: testimonial });
  } catch (e) {
    yield put({ type: types.FETCH_TESTIMONIAL_FAILED, message: e.message });
  }
}

export function* fetchRecentCommits(action) {
  try {
    const commits = yield call(gitHub.fetchGitHub, action.payload);
    yield put({ type: types.FETCH_COMMITS_SUCCEEDED, payload: commits });
  } catch (e) {
    yield put({ type: types.FETCH_COMMITS_FAILED, message: e.message });
  }
}


function* sagas() {
  yield all([
    takeLatest(types.FETCH_SITE_TEXT_REQUESTED, fetchSiteText),
    takeLatest(types.FETCH_TESTIMONIAL_REQUESTED, fetchTestimonial),
    takeLatest(types.FETCH_PROJECTS_REQUESTED, fetchProjects),
    takeLatest(types.FETCH_MUSICS_REQUESTED, fetchMusics),
    takeLatest(types.FETCH_COMMITS_REQUESTED, fetchRecentCommits)
  ]);
}


export default sagas;
