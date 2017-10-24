import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from './actionTypes';
import wpClient from '../client/wpClient';


export function* fetchProjects(action) {
  try {
    const projects = yield call(wpClient.fetchPosts, action.payload);
    yield put({ type: types.FETCH_PROJECTS_SUCCEEDED, payload: projects });
  } catch (e) {
    yield put({ type: types.FETCH_PROJECTS_FAILED, message: e.message });
  }
}

export function* fetchMusics(action) {
  try {
    const musics = yield call(wpClient.fetchPosts, action.payload);
    yield put({ type: types.FETCH_MUSICS_SUCCEEDED, payload: musics });
  } catch (e) {
    yield put({ type: types.FETCH_MUSICS_FAILED, message: e.message });
  }
}


function* sagas() {
  yield all([
    takeLatest(types.FETCH_PROJECTS_REQUESTED, fetchProjects),
    takeLatest(types.FETCH_MUSICS_REQUESTED, fetchMusics)
  ]);
}


export default sagas;
