import {takeLatest, put, call} from 'redux-saga/effects';
import request from '../../Helper/request';
import {
  getProfileLoading,
  getProfileSuccess,
  getProfileError,
  updateProfileLoading,
  updateProfileSuccess,
  updateProfileError,
} from '../../Actions/Profile/profile.actions';

import {
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
} from '../../ActionConstant/profile.constant';

/** * APIs */

const getProfileApi = async () => {
  return request({
    url: `users/profile`,
    method: 'GET',
  });
};

const updateProfileApi = async data => {
  return request({
    url: `users/updateUserProfile`,
    method: 'PUT',
    data,
  });
};

/** SAGA */

function* getProfile() {
  try {
    yield put(getProfileLoading());
    const res = yield call(getProfileApi);
    if (res && res.data.code === 200) {
      yield put(getProfileSuccess(res.data));
    } else {
      yield put(getProfileError(res.data));
    }
  } catch (error) {
    console.log('INSIDE Dashboard ACTION CALL AFTER ERROR', error);
    if (error.data) {
      yield put(
        getProfileError({
          error: error.data,
        }),
      );
    }
  }
}

function* updateProfile(data) {
  try {
    const {payload} = data;
    yield put(updateProfileLoading());
    const res = yield call(updateProfileApi, payload);
    if (res && res.data.code === 200) {
      yield put(updateProfileSuccess(res.data));
    } else {
      yield put(updateProfileError(res.data));
    }
  } catch (error) {
    console.log('INSIDE Dashboard ACTION CALL AFTER ERROR', error);
    if (error.data) {
      yield put(
        updateProfileError({
          error: error.data,
        }),
      );
    }
  }
}

export default function* ProfileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
}
