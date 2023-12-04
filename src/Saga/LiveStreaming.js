import {call, put} from 'redux-saga/effects';

import {
  saveListOfJoinedUserData,
  getHostDetailSuccessAction,
  likeLiveStreamAction,
  updateLikedStatusAction,
} from '../Redux/Action';
import {HelperService} from '../Services/Utils/HelperService';

import {
  sendGiftApi,
  likeStreamApi,
  joinNewUserApi,
  getGiftDataApi,
  getUserLiveList,
  getInterestList,
  getHostDetailApi,
  goLiveStreamCreate,
  endLiveStreamCreate,
  activeLiveUserInStreamingApi,
  liveUserMuteApi,
  liveUserKickoutApi,
  liveUserBlockApi,
  makeUserAdmin,
  reportUserApi,
  getGalleryListApi,
  getAnotherUserProfileApi,
  getProfileVideoApi,
  getDeleteOneMsgApi,
  getDeleteSelectedChatApi,
  liveSessionUserBlockApi,
  unBlockUserApi,
  getHelpCenterApi,
  getSearchUserApi,
} from '../Services/Api/LiveStreaming';
import {Alert} from 'react-native';

export function* getLiveUserList({payload, callBack}) {
  try {
    const resp = yield call(getUserLiveList, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp.user);
    } else {
      HelperService.showToast(resp?.message);
      callBack([]);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack([]);
  }
}

export function* getInterestListSaga({callBack}) {
  try {
    const resp = yield call(getInterestList);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      const parseData = resp?.result?.length
        ? resp.result.map(item => ({...item, status: false}))
        : [];
      callBack(parseData);
    } else {
      HelperService.showToast(resp?.message);
      callBack([]);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack([]);
  }
}

export function* goLiveStreamingSaga({payload, callBack}) {
  try {
    const resp = yield call(goLiveStreamCreate, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* endLiveStreamingSaga({payload}) {
  try {
    const resp = yield call(endLiveStreamCreate, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* getGiftDataSaga({payload, callBack}) {
  try {
    const resp = yield call(getGiftDataApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* sendGiftDataSaga({payload, callBack}) {
  try {
    const resp = yield call(sendGiftApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* activeUsersInStreamingSaga({payload, callBack}) {
  try {
    const resp = yield call(activeLiveUserInStreamingApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      yield put(saveListOfJoinedUserData(resp));
      callBack(resp);
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* joinNewUserStreamingSaga({payload}) {
  try {
    const resp = yield call(joinNewUserApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* likeStreamUsingApiSaga({payload}) {
  try {
    const resp = yield call(likeStreamApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      yield put(likeLiveStreamAction(resp.data));
      yield put(updateLikedStatusAction());
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* getHostExtraDetailApi({payload}) {
  try {
    const resp = yield call(getHostDetailApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      yield put(getHostDetailSuccessAction(resp.data));
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* liveUserMute({payload, callBack}) {
  try {
    const resp = yield call(liveUserMuteApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('User muted');
    } else {
      HelperService.showToast(resp?.message);

      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* liveUserKickout({payload, callBack}) {
  try {
    const resp = yield call(liveUserKickoutApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      HelperService.showToast('User kicked out');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* liveUserBlock({payload, callBack}) {
  try {
    const resp = yield call(liveUserBlockApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      HelperService.showToast('User blocked');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* unBlockUserSaga({payload, callBack}) {
  try {
    const resp = yield call(unBlockUserApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      HelperService.showToast('User Unblocked');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* makeRemoveUserAdmin({payload, callBack}) {
  try {
    const resp = yield call(makeUserAdmin, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* reportUserSaga({payload, callBack}) {
  try {
    const resp = yield call(reportUserApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* getGalleryListSaga({payload, callBack}) {
  try {
    const resp = yield call(getGalleryListApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* getAnotherUserProfileSaga({payload, callBack}) {
  try {
    const resp = yield call(getAnotherUserProfileApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* getDeleteOneMsgSaga({payload, callBack}) {
  try {
    const resp = yield call(getDeleteOneMsgApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* getUserVideoSaga({payload, callBack}) {
  try {
    let data = yield call(getProfileVideoApi, payload);
    if ((data && data.code == 200) || (data && data.code == 201)) {
      callBack(data);
    } else {
      HelperService.showToast(data?.message);
      callBack();
    }
  } catch (error) {
    //    HelperService.showToast( error?.message );
    yield put(CommonActions.getUserVideoFailure());
  }
}

export function* getDeleteSelectedChat({payload, callBack}) {
  try {
    const resp = yield call(getDeleteSelectedChatApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* liveSessionUserBlock({payload, callBack}) {
  try {
    const resp = yield call(liveSessionUserBlockApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* getHelpCenter({payload, callBack}) {
  try {
    const resp = yield call(getHelpCenterApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      // HelperService.showToast('Success');
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* getSearchUser({payload, callBack}) {
  try {
    const resp = yield call(getSearchUserApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp.user);
    } else {
      HelperService.showToast(resp?.message);
      callBack([]);
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack([]);
  }
}
