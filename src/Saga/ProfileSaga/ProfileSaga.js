import {takeLatest, put, call} from 'redux-saga/effects';
import request from '../../Helper/request';
import {
  getProfileLoading,
  getProfileSuccess,
  getProfileError,
} from '../../Actions/Profile/profile.actions';

import {GET_PROFILE_REQUEST} from '../../ActionConstant/profile.constant';

/** * APIs */

// const profileApi = async data => {
//   return request({
//     url: `/api/v1/users/${data}`,
//     method: 'GET',
//     data,
//   });
// };

/** SAGA */

function* Profile(data) {
  try {
    const {payload} = data;
    console.log('payload of profile', payload);
    //const res = yield call(profileApi, payload);
    yield put(getProfileLoading());
    if (res) {
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

export default function* ProfileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, Profile);
}
