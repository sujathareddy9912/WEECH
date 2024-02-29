import {in200s, userApiClient} from './Common';
import {serviceConst} from '../Utils/HelperService';

export function getUserLiveList(params) {
  const url = `users/user_live_list?orderName=points&orderType=asc&length=10&search=${
    params?.searchKey || ''
  }&start=${params?.pageNumber}&country=${params?.country}&latitude=${
    params?.latitude || ''
  }&longitude=${params?.longitude || ''}`;
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

export function getInterestList() {
  const url = `interest/list`;
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

export function goLiveStreamCreate(body) {
  const url = `liveRoom/create`;
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

export function endLiveStreamCreate(body) {
  const url = `liveRoom/leave_room`;
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

export function getGiftDataApi(searchKey) {
  const url = `gift/user_gift_list`;
  return userApiClient
    .get(url, {
      headers: {
        Authorization: serviceConst.token,
      },
      params: {keyword: searchKey},
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

export function sendGiftApi(body) {
  const url = `gift/share_gift`;
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

export function activeLiveUserInStreamingApi(body) {
  const url = `liveRoom/get_joined_users`;
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

export function joinNewUserApi(body) {
  const url = `liveRoom/join`;
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

export function likeStreamApi(body) {
  const url = `liveRoom/like`;
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

export function getHostDetailApi(payload) {
  const url = `users/get_hosts_extra_details/${payload}`;
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

export function getCallingDetailApi(body) {
  const url = `calling/create`;
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

export function leaveCallingRoomApi(body) {
  const url = `calling/update_call`;
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
export function createCallingRoomApi(body) {
  const url = `income/create`;
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
      return error;
    });
}

export function viewedProfileUserApi(body) {
  const url = `visitor/create`;
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

export function deleteAllRecentCallApi(body) {
  const url = `calling/delete_all_call`;
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

export function liveUserMuteApi(body) {
  const url = `liveRoom/mute_user`;
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

export function liveUserKickoutApi(body) {
  const url = `liveRoom/kickout_user`;
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

export function liveUserBlockApi(body) {
  const url = `block/block_user`;
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

export function unBlockUserApi(body) {
  const url = `block/unblock_user`;
  return userApiClient
    .post(
      url,
      {id: body},
      {
        headers: {
          Authorization: serviceConst.token,
        },
      },
    )
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

export function makeUserAdmin(body) {
  const url = `liveRoom/make_admin`;
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

export function reportUserApi(body) {
  const url = `report/report_user`;
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

export function getGalleryListApi(param) {
  const url = `users/user_media/${param?.userId}`;
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

export function getAnotherUserProfileApi(param) {
  const url = `users/another_user_profile/${param?.userId}`;
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

export function deleteVisitorAPI(body) {
  const url = `visitor/delete_visitor`;
  return userApiClient
    .delete(url, {
      headers: {
        Authorization: serviceConst.token,
      },
      data: body,
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

export function clearVisitorAPI() {
  const url = `visitor/clear_visitor`;
  return userApiClient
    .delete(url, {
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

export function getDeleteOneMsgApi(body) {
  const url = `chat/delete_message`;
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

export function getProfileVideoApi(params) {
  let url = 'users/user_video/' + params;

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

export function getDeleteSelectedChatApi(body) {
  const url = `chat/delete_selected_chat`;
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

export function liveSessionUserBlockApi(body) {
  const url = `liveRoom/live_block_user`;
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

export function getHelpCenterApi() {
  let url = 'setting/helpCenter';

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

export async function getUserHaveBalance(body) {
  let url = 'income/check_user_balance';

  return await userApiClient.post(url, body, {
    headers: {
      Authorization: serviceConst.token,
    },
  });
}

export function getLiveUserNotification(data) {
  const endPoint = 'notification/get_live_notification';

  return userApiClient.get(
    `${endPoint}?length=${data.length}&start=${data.start}`,
    {
      headers: {
        Authorization: serviceConst.token,
      },
    },
  );
}

export function getMomentsNotification(data) {
  const endPoint = 'notification/get_my_notification';

  return userApiClient.get(`${endPoint}`, {
    headers: {
      Authorization: serviceConst.token,
    },
  });
}

export function getSearchUserApi(params) {
  const url = `users/search_user?orderName=points&orderType=asc&length=10&search=${
    params?.searchKey || ''
  }&start=${params?.pageNumber}`;
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

export function getEndUserDetailApi(body) {
  const url = 'liveRoom/get_live_details';
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

export function getUserDailyIncome(body) {
  const url = `income/get_user_daily_income`;
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
