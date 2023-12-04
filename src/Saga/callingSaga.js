import {call} from 'redux-saga/effects';

import {HelperService} from '../Services/Utils/HelperService';

import {
  createCallingRoomApi,
  deleteAllRecentCallApi,
  getCallingDetailApi,
  leaveCallingRoomApi,
  viewedProfileUserApi,
} from '../Services/Api/LiveStreaming';

export function* getCallingDetailSaga({payload, callBack}) {
  try {
    const resp = yield call(getCallingDetailApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp.data);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* leaveCallRoomSaga({payload}) {
  try {
    const resp = yield call(leaveCallingRoomApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* createIncomeCallSaga({payload, callBack}) {
  try {
    const resp = yield call(createCallingRoomApi, payload);
    // if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
    // } else {
    //   HelperService.showToast(resp?.message);
    // }
    callBack(resp);
  } catch (error) {
    callBack(error.response);
    HelperService.showToast('Something went wrong');
  }
}

export function* viewedProfileUserSaga({payload}) {
  try {
    const resp = yield call(viewedProfileUserApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* deleteAllRecentCallSaga({payload, callBack}) {
  try {
    const resp = yield call(deleteAllRecentCallApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(true);
      HelperService.showToast(resp.message);
    } else {
      callBack();
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack();
    HelperService.showToast('Something went wrong');
  }
}
