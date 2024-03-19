import {call} from 'redux-saga/effects';

import {UserServices} from '../Services/Api/userServices';
import {HelperService} from '../Services/Utils/HelperService';

export function* followUserSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.followUserApi, payload);
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

export function* followerListSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.followerUserListApi, payload);
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

export function* followingListSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.followingUserListApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* getFriendsList({payload, callBack}) {
  try {
    const resp = yield call(UserServices.getFriendsListApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* inviteToGroupSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.inviteToGroupActionApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* allowFreeChat({payload, callBack}) {
  try {
    const resp = yield call(UserServices.allowFreeChat, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}
export function* shareLiveLinkWithFriends({payload, callBack}) {
  try {
    const resp = yield call(UserServices.shareLiveLink, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* shareLiveLinkWithGroups({payload, callBack}) {
  try {
    const resp = yield call(UserServices.shareLiveLinkGroup, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* getGrpDetailsSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.getGrpDetailsSagaApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* makeGrpAdminSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.makeGrpAdminSagaApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* removeGrpMemberSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.removeGrpMemberSagaApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* getReceivedGiftDataSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.getReceivedGiftDataAPI, payload);
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

export function* getSendGiftDataSaga({payload, callBack}) {
  try {
    const resp = yield call(UserServices.getSendGiftDataAPI, payload);
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
