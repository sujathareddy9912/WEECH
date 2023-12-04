import {Alert} from 'react-native';
import {call, put} from 'redux-saga/effects';
import {
  updateChatHistoryAction,
  getChatHistorySuccessAction,
} from '../Redux/Action';

import {MyBalanceServices} from '../Services/Api/myBalanceServices';
import {HelperService} from '../Services/Utils/HelperService';

export function* getDiamondListSaga({payload, page, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.getDiamondListApi, payload);
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

export function* getAgencyListSaga({payload, page, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.getAgencyListApi, payload);
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

export function* getMyEarningListSaga({callBack}) {
  try {
    const resp = yield call(MyBalanceServices.getMyEarnings);
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

export function* getFreeCardsListSaga({callBack, payload}) {
  try {
    const resp = yield call(MyBalanceServices.getFreeCards, payload);
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

export function* claimFreeCardSaga({callBack, payload}) {
  try {
    const resp = yield call(MyBalanceServices.claimFreeCard, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      HelperService.showToast(resp?.message);
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* getEarningDetailSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.getEarningDetail, payload);
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

export function* getSettlementDetailSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.getSettlementDetail, payload);
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

export function* getBlockListSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.getBlockList, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(resp);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* linkMailSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.linkMail, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      console.log(resp,"34OTPPP");
      callBack(resp);
    } else {
      callBack(resp);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* updateMailSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.updateMail, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      console.log(resp,"34MAILLLS");
      callBack(resp);
    } else {
      callBack(resp);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* linkPhoneSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.linkPhone, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(resp);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* updatePhoneSaga({payload, callBack}) {
  try {
    const resp = yield call(MyBalanceServices.updatePhone, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
    } else {
      callBack(resp);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}
