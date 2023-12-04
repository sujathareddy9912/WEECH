import {serviceConst} from '../Utils/HelperService';
import {in200s, userApiClient} from './Common';

function recentChatApi(params) {
  const endPoint = 'calling/get_recent';
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
      console.log('err  recent call recentChatApi', error);
      return error.response.data;
    });
}

function deleteRecentChatApi(param) {
  const endPoint = 'calling/delete_call';
  return userApiClient
    .post(endPoint, param, {
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
      console.log('err  recent call deleteRecentChatApi', error);
      return error.response.data;
    });
}

function visitorListApi(params) {
  const endPoint = 'visitor/get_visitors';
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
      console.log('err visitor list visitorListApi', error);
      return error.response.data;
    });
}

function createChatRoomApi(params) {
  const endPoint = 'chat/create';
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
      console.log('err  recent call createChatRoomApi', error);
      return error.response.data;
    });
}

function getChatMessagesApi(params) {
  const endPoint = 'chat/get_message';
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
      console.log('err  recent call getChatMessagesApi', error);
      return error.response.data;
    });
}

function getGroupMessagesSagaApi(params) {
  const endPoint = 'chat/get_group_message';
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
      console.log('err  recent call getGroupMessagesSagaApi', error);
      return error.response.data;
    });
}

function getChatListApi(params) {
  const endPoint = 'chat/get_chat';
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
      console.log('err  recent call getChatListApi', error);
      return error.response.data;
    });
}

function uploadChatVideoFileSagaApi(params) {
  const endPoint = 'chatVideo/upload_video';
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
      console.log('err  recent call uploadChatVideoFileSagaApi', error);
      return error.response.data;
    });
}

function uploadChatMediaFileApi(params) {
  const endPoint = 'chat/upload_file';
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
      console.log('err  recent call uploadChatMediaFileApi', error);
      return error.response.data;
    });
}

function grpChatCreationApi(params) {
  const endPoint = 'chat/create_group';
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
      console.log('err  grp creation grpChatCreationApi', error);
      return error.response.data;
    });
}

function grpChatUpdateApi(params) {
  const endPoint = 'chat/update_group_chat';
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
      console.log('err  grp creation grpChatUpdateApi', error);
      return error.response.data;
    });
}

function getGroupChatsApi(params) {
  const endPoint = 'chat/get_groups';
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
      console.log('err get grp list getGroupChatsApi', error);
      return error.response.data;
    });
}

export const ChatServices = {
  recentChatApi,
  visitorListApi,
  deleteRecentChatApi,
  createChatRoomApi,
  getChatMessagesApi,
  getChatListApi,
  uploadChatMediaFileApi,
  uploadChatVideoFileSagaApi,
  grpChatCreationApi,
  getGroupChatsApi,
  getGroupMessagesSagaApi,
  grpChatUpdateApi,
};
