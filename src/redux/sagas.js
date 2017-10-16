import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from './actionTypes';
import wpClient from '../client/wpClient';


export function* fetchProjects(action) {
  try {
    const projects = yield call(wpClient.fetchProjects, action.payload);
    yield put({ type: types.FETCH_PROJECTS_SUCCEEDED, payload: projects });
  } catch (e) {
    yield put({ type: types.FETCH_PROJECTS_FAILED, message: e.message });
  }
}


function* sagas() {
  yield all([
    takeLatest(types.FETCH_PROJECTS_REQUESTED, fetchProjects),
  ]);
}


export default sagas;
