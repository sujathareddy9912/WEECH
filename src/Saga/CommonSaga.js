import _ from 'lodash';
import {call, put} from 'redux-saga/effects';

import {storeData} from '../Utils/helper';
import {LOCAL_KEY} from '../Utils/localStorage';
import {reset} from '../Navigator/navigationHelper';
import CommonActions from '../Store/Common/Actions';
import {CommonService} from '../Services/Api/Common';
import {handleError} from '../Utils/handlErrors';
import {showMessage} from 'react-native-flash-message';
import {HelperService, serviceConst} from '../Services/Utils/HelperService';
import {
  getLanguageSuccessAction,
  getUserStatsAction,
  loginSuccessAction,
} from '../Redux/Action';

export function* getLanguage(params) {
  try {
    const resp = yield call(CommonService.getLanguage);
    if (resp) {
      yield put(getLanguageSuccessAction(resp));
      params.callBack(true);
    } else {
      params.callBack(false);
    }
  } catch (error) {
    params.callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* sentOtp(param) {
  try {
    const resp = yield call(CommonService.sentOtp, param.payload);
    if (resp.code == 200 || resp.code == 201) {
      param.callBack(resp);
      //HelperService.showToast(resp.message);
      showMessage({
        description: resp.message,
        message: 'Send OTP',
        type: 'success',
        icon: 'success',
      });
    } else {
     // HelperService.showToast(resp?.message);
     showMessage({
      description: resp?.message,
      message: 'Unable to Send OTP',
      type: 'danger',
      icon: 'info',
    });
      param.callBack(false);
    }
  } catch (error) {
    showMessage({
      description: 'Something went wrong',
      message: 'Unable to Send OTP',
      type: 'danger',
      icon: 'info',
    });
    //HelperService.showToast('Something went wrong');
    param.callBack(false);
  }
}

export function* userLogin({payload, callBack}) {
  try {
    const resp = yield call(CommonService.userLogin, payload);
    if (resp && resp.code == 201) {
      storeData(LOCAL_KEY.TOKEN, resp.tokens.access.token);
      storeData(
        LOCAL_KEY.PROFILE_SETUP_STATUS,
        resp.user.first_time ? 'true' : 'false',
      );
      serviceConst.token = resp.tokens.access.token;
      const data = {user: resp.user, tokens: resp.tokens};
      yield put(loginSuccessAction(data));
      callBack();
      if (resp.user.first_time) {
        reset('ProfileSetup', {isEdit: false});
      } else {
        reset('MainTabNavigation');
      }
    } else {
      //HelperService.showToast(resp?.message);
      handleError(resp?.message);
      callBack();
    }
  } catch (error) {
    handleError('Something went wrong');
    callBack();
  }
}

export function* userLogOut() {
  try {
    storeData(LOCAL_KEY.TOKEN, '');
    serviceConst.token = '';
    const data = {};
    yield put(loginSuccessAction(data));
    reset('AuthStack');
  } catch (error) {
    HelperService.showToast('Something went wrong');
  }
}

export function* userRegistration(param) {
  try {
    const resp = yield call(CommonService.userRegistration, param.payload);
    if (resp.code == 201) {
      storeData(LOCAL_KEY.TOKEN, resp.tokens.access.token);
      storeData(LOCAL_KEY.PROFILE_SETUP_STATUS, 'true');
      serviceConst.token = resp.tokens.access.token;
      const data = {user: resp.user, tokens: resp.tokens};
      yield put(loginSuccessAction(data));
      param.callBack(true);
    } else {
     // HelperService.showToast(resp?.message);
     showMessage({
      description: resp?.message,
      message: 'Signup Error',
      type: 'danger',
      icon: 'info',
    });
      param.callBack(false);
    }
  } catch (error) {
   // HelperService.showToast(error?.message);
   showMessage({
    description: error?.message,
    message: 'Signup Error',
    type: 'danger',
    icon: 'info',
  });
    param.callBack(false);
  }
}

export function* forgotPasswordSendOtp(param) {
  try {
    const resp = yield call(CommonService.forgotPasswordOtp, param.payload);
    if (resp.code == 201) {
      param.callBack(resp);
      HelperService.showToast(resp?.message);
    } else {
      HelperService.showToast(resp?.message);
      param.callBack(false);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
    param.callBack(false);
  }
}

export function* forgotPassword(param) {
  try {
    const resp = yield call(CommonService.forgotPassword, param.payload);
    if (resp.code == 200) {
      param.callBack(true);
      HelperService.showToast(resp?.message);
    } else {
      HelperService.showToast(resp?.message);
      param.callBack(false);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
    param.callBack(false);
  }
}

export function* updateUserProfile(param) {
  yield put(CommonActions.updateUserProfileLoading());
  try {
    const {payload, callBack} = param;

    const resp = yield call(CommonService.updateUserProfile, payload);

    if (resp && resp.code == 200) {
      storeData(LOCAL_KEY.PROFILE_SETUP_STATUS, 'false');
      yield put(CommonActions.updateUserProfileSuccess(resp));
      callBack(resp);
    } else {
      HelperService.showToast(resp?.message);
      callBack(false);
    }
  } catch (error) {
    console.log(error);
    HelperService.showToast(resp?.message);
    callBack(false);
  }
}

export function* getUserProfile({callBack}) {
  try {
    let data = yield call(CommonService.getUserProfile);
    if ((data && data.code == 200) || (data && data.code == 201)) {
      yield put(loginSuccessAction({user: data.user}));
      callBack(data?.user);
    } else {
      HelperService.showToast(data?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getUserStats({payload, callBack}) {
  try {
    let data = yield call(CommonService.getUserStats, payload);
    if ((data && data.code == 200) || (data && data.code == 201)) {
      // yield put(getUserStatsAction({userStats:data?.data}))
      callBack(data?.data);
    } else {
      HelperService.showToast(data?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* videoUploadSaga(param) {
  try {
    const resp = yield call(CommonService.uploadVideo, param.payload);

    if ((resp && resp.status == 200) || (resp && resp.status == 201)) {
      param.callBack(resp);
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* imageUploadSaga(param) {
  try {
    const resp = yield call(CommonService.uploadImage, param.payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      param.callBack(true);
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* deleteImgVideoSaga(param) {
  try {
    const resp = yield call(CommonService.deleteImgVideo, param.payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      param.callBack(true);
    } else {
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getUserGallary({payload}) {
  yield put(CommonActions.getUserGallaryLoading());

  try {
    let data = yield call(CommonService.getUserGallary, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.getUserGallarySuccess(data));
    } else {
      // HelperService.showToast( data?.message );
      yield put(CommonActions.getUserGallaryFailure());
    }
  } catch (error) {
    //    HelperService.showToast( error?.message );
    yield put(CommonActions.getUserGallaryFailure());
  }
}

export function* getUserVideo({payload}) {
  yield put(CommonActions.getUserVideoLoading());

  try {
    let data = yield call(CommonService.getUserVideo, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.getUserVideoSuccess(data));
    } else {
      // HelperService.showToast( data?.message );
      yield put(CommonActions.getUserVideoFailure());
    }
  } catch (error) {
    //    HelperService.showToast( error?.message );
    yield put(CommonActions.getUserVideoFailure());
  }
}

export function* getUserFilter({payload}) {
  yield put(CommonActions.getUserFilterLoading());

  try {
    let data = yield call(CommonService.getUserFilter, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.getUserFilterSuccess(data));
    } else {
      // HelperService.showToast( data?.message );
      yield put(CommonActions.getUserFilterFailure());
    }
  } catch (error) {
    //    HelperService.showToast( error?.message );
    yield put(CommonActions.getUserFilterFailure());
  }
}

export function* social_login({payload, callBack}) {
  try {
    const resp = yield call(CommonService.social_login, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      storeData(LOCAL_KEY.TOKEN, resp.tokens.access.token);
      storeData(
        LOCAL_KEY.PROFILE_SETUP_STATUS,
        resp.user.first_time ? 'true' : 'false',
      );
      serviceConst.token = resp.tokens.access.token;
      const data = {user: resp.user};
      yield put(loginSuccessAction(data));
      callBack();
      if (resp.user.first_time) {
        reset('ProfileSetup', {isEdit: false});
      } else {
        reset('MainTabNavigation');
      }
    } else {
      HelperService.showToast(resp?.message);
      callBack();
    }
  } catch (error) {
    HelperService.showToast('Something went wrong');
    callBack();
  }
}

export function* tradeUserExisting({payload, callBack}) {
  yield put(CommonActions.tradeUserExistingLoading());

  try {
    let data = yield call(CommonService.tradeUserExisting, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.tradeUserExistingSuccess(data));
      callBack(data?.message);
    } else {
      HelperService.showToast(data?.message);
      yield put(CommonActions.tradeUserExistingFailure());
      callBack(data?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
    yield put(CommonActions.tradeUserExistingFailure());
  }
}

export function* tradeTransactionInitializer({payload, callBack}) {
  yield put(CommonActions.tradeTransactionInitializerLoading());

  try {
    let data = yield call(CommonService.tradeTransactionInitializer, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.tradeTransactionInitializerSuccess(data));
      callBack(data?.message);
    } else {
      HelperService.showToast(data?.message);
      yield put(CommonActions.tradeTransactionInitializerFailure());
      callBack(data?.message);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
    yield put(CommonActions.tradeTransactionInitializerFailure());
  }
}

export function* getTradeTransactionsList({payload, callBack}) {
  yield put(CommonActions.getTradeTransactionsListLoading());

  try {
    let data = yield call(CommonService.getTradeTransactionsList, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.getTradeTransactionsListSuccess(data));
      callBack(data?.data);
    } else {
      HelperService.showToast(data?.message);
      yield put(CommonActions.getTradeTransactionsListFailure());
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
    yield put(CommonActions.getTradeTransactionsListFailure());
  }
}

export function* getTradeTransfer({payload, callBack}) {
  yield put(CommonActions.getTradeTransferLoading());

  try {
    let data = yield call(CommonService.getTradeTransfer, payload);
    if (data && data.code == 200) {
      yield put(CommonActions.getTradeTransferSuccess(data));
      callBack(data?.data);
    } else {
      HelperService.showToast(data?.message);
      yield put(CommonActions.getTradeTransferFailure());
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
    yield put(CommonActions.getTradeTransferFailure());
  }
}

export function* getUserAgreementSaga({callBack}) {
  try {
    let data = yield call(CommonService.getUserAgreementApi);
    if (data && data.code == 200) {
      callBack(data?.data);
    } else {
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getAboutWeechaSaga({callBack}) {
  try {
    let data = yield call(CommonService.getAboutWeechaApi);
    if (data && data.code == 200) {
      callBack(data?.data);
    } else {
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getPrivacyPolicySaga({callBack}) {
  try {
    let data = yield call(CommonService.getPrivacyPolicyApi);
    if (data && data.code == 200) {
      callBack(data?.data);
    } else {
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getWeechaLevelSaga({payload, callBack}) {
  try {
    let data = yield call(CommonService.getWeechaLevelApi, payload);
    if (data && data.code == 200) {
      callBack(data?.data);
    } else {
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* rechargeUserBalanceSaga({payload, callBack}) {
  try {
    let data = yield call(CommonService.rechargeUserBalanceApi, payload);
    if (data && data.code == 200) {
      callBack(data?.data);
    } else {
      callBack(data?.data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getRechargeAgencySaga({callBack}) {
  try {
    let data = yield call(CommonService.getRechargeAgencyApi);
    if (data && data.code == 200) {
      callBack(data);
    } else {
      callBack(data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getCustomerMsgsSaga({payload, callBack}) {
  try {
    let data = yield call(CommonService.getCustomerMsgsApi, payload);
    if (data && data.code == 200) {
      callBack(data);
    } else {
      callBack(data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}

export function* getCustomerSendMsgSaga({payload, callBack}) {
  try {
    let data = yield call(CommonService.getCustomerSendMsgApi, payload);
    if (data && data.code == 200) {
      callBack(data);
    } else {
      callBack(data);
    }
  } catch (error) {
    HelperService.showToast(error?.message);
  }
}
