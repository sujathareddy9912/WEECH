import {Alert} from 'react-native';
import {serviceConst} from '../Utils/HelperService';
import {in200s, userApiClient} from './Common';

function getDiamondListApi(params) {
  let url = 'income/diamonds_price_list';

  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getAgencyListApi(params) {
  let url = `agency/getAgenciesList?length=${params?.length}&start=${
    params?.start
  }&gender=${params?.gender}&type=${params?.type}&search=${params?.search ?? ''}`;

  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getMyEarnings() {
  let url = `income/user_earning`;
  return userApiClient
    .post(
      url,
      {},
      {
        headers: {
          Authorization: serviceConst.token,
        },
      },
    )
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getFreeCards(payload) {
  let url = `gift/get_user_free_card`;
  return userApiClient
    .post(url, payload, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return response?.data;
    })
    .catch(error => {
      return error.response.data;
    });
}

function claimFreeCard(payload) {
  let url = `gift/claim_free_card`;
  return userApiClient
    .post(url, payload, {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getEarningDetail(payload) {
  let url = `income/user_earning_list`;
  return userApiClient
    .post(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getSettlementDetail(payload) {
  let url = `income/user_settlement_detail`;
  return userApiClient
    .post(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function getBlockList(payload) {
  let url = `block/get_block_user`;
  return userApiClient
    .post(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function linkMail(payload) {
  let url = `language/send_email`;
  return userApiClient
    .post(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      console.log(response, 'OTPPP');
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function updateMail(payload) {
  let url = `users/update_email`;
  return userApiClient
    .put(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      console.log(response, '34OTPPP');
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function updatePhone(payload) {
  let url = `users/update_phone`;
  return userApiClient
    .put(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

function linkPhone(payload) {
  let url = `language/send_update_otp`;
  return userApiClient
    .post(url, JSON.stringify(payload), {
      headers: {
        Authorization: serviceConst.token,
      },
    })
    .then(response => {
      if (in200s(response.status)) {
        return response?.data;
      }
      return null;
    })
    .catch(error => {
      return null;
    });
}

export const MyBalanceServices = {
  getDiamondListApi,
  getAgencyListApi,
  getMyEarnings,
  getEarningDetail,
  getBlockList,
  getSettlementDetail,
  getFreeCards,
  claimFreeCard,
  linkMail,
  updateMail,
  linkPhone,
  updatePhone,
};
