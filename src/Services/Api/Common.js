import axios from 'axios';
import {is, curryN, gte} from 'ramda';
import RNFetchBlob from 'rn-fetch-blob';

import {serviceConst} from '../Utils/HelperService';

export const URL = 'https://api.weecha.uk/v1/';
export const SERVER_API = 'https://api.weecha.uk';
export const SOCKET_URL = 'wss://api.weecha.uk';
export const IMAGE_URL = 'https://api.weecha.uk/v1/uploads/';

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number);
  return (
    isNumber(min) &&
    isNumber(max) &&
    isNumber(value) &&
    gte(value, min) &&
    gte(max, value)
  );
});

export const in200s = isWithin(200, 299);

export const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function getLanguage(params) {
  let url = 'language/list';

  // url += params.date ?`&date=${params.date}` : '';

  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data']['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}
function userRegistration(params) {
  let url = 'users/create';
  return userApiClient
    .post(url, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return response['data'];
    })
    .catch(error => {
      return error.response.data;
    });
}

function forgotPasswordOtp(params) {
  const endPoint = 'language/send_forgot_otp';
  return userApiClient
    .post(endPoint, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return response['data'];
    })
    .catch(error => {
      return error.response.data;
    });
}

function forgotPassword(params) {
  const endPoint = 'users/update_password';
  return userApiClient
    .put(endPoint, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return response['data'];
    })
    .catch(error => {
      return error.response.data;
    });
}

function userLogin(params) {
  let url = 'users/login';
  let body = {
    phone: params.phone,
    password: params.password,
  };
  return userApiClient
    .post(url, body, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return error.response.data;
    });
}

function social_login(params) {
  let url = 'users/social_login';
  let body = {
    socialMediaType: params.type,
    socialMediaId: params.id,
    email: params.email,
  };
  return userApiClient
    .post(url, body, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return error.response.data;
    });
}

function sentOtp(params) {
  let url = 'language/send_message';
  let body = {
    phone: params.phone,
  };
  return userApiClient
    .post(url, body)
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      } else return response.data;
    })
    .catch(error => {
      return error.response.data;
    });
}

async function updateUserProfile(params) {
  let url = 'users/updateUserProfile';
  return userApiClient
    .put(url, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function getUserProfile() {
  let url = 'users/profile';

  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getUserStats(param) {
  let url = `users/user_states/${param?.userId}`;

  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

async function uploadVideo(file) {
  const url = 'video/save_video';

  return await RNFetchBlob.fetch(
    'POST',
    URL + url,
    {
      'content-type': 'multipart/form-data',
      Accept: 'multipart/form-data',
      Authorization: serviceConst.token,
    },
    file,
  )
    .then(async response => {
      if (in200s(response?.respInfo?.status)) {
        return response['respInfo'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

async function uploadImage(file) {
  const url = 'users/save_image';
  const data = JSON.stringify({file: file});
  return userApiClient
    .post(url, data, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(async response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

async function deleteImgVideo(id) {
  const url = 'users/delete_files';
  let body = JSON.stringify({id: id});
  return userApiClient
    .delete(url, {
      headers: {
        Authorization: serviceConst.token,
      },
      data: body,
    })
    .then(async response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getUserGallary(params) {
  let url = 'users/user_gallery/' + params;

  return userApiClient
    .get(url, params)
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getUserVideo(params) {
  let url = 'users/user_video/' + params;

  return userApiClient
    .get(url, params)
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getUserFilter() {
  let url =
    'users/user_filter_list?orderName=points&orderType=asc&length=10&search&start=0';

  return userApiClient
    .get(url)
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function tradeUserExisting(params) {
  const url = 'users/check_userId';
  let body = params;
  return userApiClient
    .post(url, body, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function tradeTransactionInitializer(params) {
  const url = 'users/transfer_balance';
  return userApiClient
    .post(url, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return response['data'];
    })
    .catch(error => {
      return error?.message;
    });
}

function getTradeTransactionsList(params) {
  const url = 'users/get_transfer_list';
  return userApiClient
    .post(url, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getTradeTransfer(params) {
  const url = 'users/transfer_balance_settle';
  return userApiClient
    .post(url, params, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getUserAgreementApi() {
  const url = 'setting/userAgreement';
  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getAboutWeechaApi() {
  const url = 'setting/aboutWeecha';
  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getPrivacyPolicyApi() {
  const url = 'setting/privacy_policy';
  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getWeechaLevelApi(data) {
  const url = 'income/get_level_data';
  return userApiClient
    .post(url, data, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function rechargeUserBalanceApi(data) {
  const url = 'income/recharge_user_balance';
  return userApiClient
    .post(url, data, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getRechargeAgencyApi(params) {
  const url =
    'users/get_recharge_agency?orderType=asc&start=0&orderName=points&length=20&search';
  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getCustomerMsgsApi(body) {
  const url = 'support/get_message';
  return userApiClient
    .post(url, body, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getCustomerSendMsgApi(body) {
  const url = 'support/send_message';
  return userApiClient
    .post(url, body, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response['data'];
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

export const CommonService = {
  getLanguage,
  userRegistration,
  forgotPasswordOtp,
  forgotPassword,
  userLogin,
  sentOtp,
  updateUserProfile,
  getUserProfile,
  getUserStats,
  uploadVideo,
  getUserGallary,
  getUserVideo,
  getUserFilter,
  social_login,
  tradeUserExisting,
  tradeTransactionInitializer,
  getTradeTransactionsList,
  getTradeTransfer,
  deleteImgVideo,
  uploadImage,
  getUserAgreementApi,
  getAboutWeechaApi,
  getPrivacyPolicyApi,
  getWeechaLevelApi,
  rechargeUserBalanceApi,
  getRechargeAgencyApi,
  getCustomerMsgsApi,
  getCustomerSendMsgApi,
};
