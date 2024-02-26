import {serviceConst} from '../Utils/HelperService';
import {in200s, userApiClient} from './Common';

function followUserApi(params) {
  const endPoint = 'followUser/follow';
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
      console.log('err follow user followUserApi', error.response);
      return error.response.data;
    });
}

function followerUserListApi(params) {
  const endPoint = 'followUser/follower';
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
      console.log('err follow list followerUserListApi', error.response);
      return error.response.data;
    });
}

function followingUserListApi(params) {
  const endPoint = 'followUser/following';
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
      console.log('err follow list followingUserListApi', error.response);
      return error.response.data;
    });
}

function getFriendsListApi(params) {
  const endPoint = 'followUser/friends';
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
      console.log('err friends list getFriendsListApi', error.response);
      return error.response.data;
    });
}

function inviteToGroupActionApi(params) {
  const endPoint = 'chat/add_group_member';
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
      console.log('err friends list inviteToGroupActionApi', error.response);
      return error.response.data;
    });
}

function allowFreeChat(params) {
  const endPoint = 'gift/allow_for_free_chat';
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
      console.log('err FREE CHAT', error.response);
      return error.response.data;
    });
}

function shareLiveLink(params) {
  const endPoint = 'chat/share_live_link';
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
      console.log('err Live LINK', error.response);
      return error.response.data;
    });
}

function getGrpDetailsSagaApi(params) {
  const endPoint = `chat/get_groups_details/${params}`;
  return userApiClient
    .get(endPoint, {
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
      console.log('err getGrpDetailsSagaApi', error.response);
      return error.response.data;
    });
}

function makeGrpAdminSagaApi(params) {
  const endPoint = 'chat/make_admin_group_member';
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
      console.log('err friends list makeGrpAdminSagaApi', error.response);
      return error.response.data;
    });
}

function removeGrpMemberSagaApi(params) {
  const endPoint = 'chat/remove_group_member';
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
      console.log('err friends list removeGrpMemberSagaApi', error.response);
      return error.response.data;
    });
}

function saveFcmTokenApi(params) {
  const endPoint = 'notification/save_fcm_token';
  return userApiClient.post(endPoint, params, {
    headers: {
      Authorization: serviceConst.token,
    },
  });
}

function updateFcmTokenApi(params) {
  const endPoint = 'notification/update_fcm_token';
  return userApiClient.put(endPoint, params, {
    headers: {
      Authorization: serviceConst.token,
    },
  });
}

function getAgencyDetail(params) {
  const endPoint = `agency/agencyProfile/${params}`;
  return userApiClient.get(endPoint, {
    headers: {
      Authorization: serviceConst.token,
    },
  });
}

function deleteUserAccount(params) {
  const endPoint = `users/delete_my_account/${params}`;
  return userApiClient.delete(endPoint, {
    headers: {
      Authorization: serviceConst.token,
    },
  });
}

function getReceivedGiftDataAPI(params) {
  const endPoint = 'gift/gift_received';
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

function getSendGiftDataAPI(params) {
  const endPoint = 'gift/gift_sends';
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

export const UserServices = {
  followUserApi,
  getFriendsListApi,
  followerUserListApi,
  followingUserListApi,
  inviteToGroupActionApi,
  getGrpDetailsSagaApi,
  makeGrpAdminSagaApi,
  removeGrpMemberSagaApi,
  allowFreeChat,
  saveFcmTokenApi,
  updateFcmTokenApi,
  shareLiveLink,
  getAgencyDetail,
  deleteUserAccount,
  getReceivedGiftDataAPI,
  getSendGiftDataAPI,
};
