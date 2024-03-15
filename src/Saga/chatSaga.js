import {call, put} from 'redux-saga/effects';
import {
  updateChatHistoryAction,
  getChatHistorySuccessAction,
  updateGrpChatHistoryAction,
  getGroupChatHistorySuccessAction,
} from '../Redux/Action';

import {ChatServices} from '../Services/Api/chatServices';
import {IMAGE_URL} from '../Services/Api/Common';
import {HelperService} from '../Services/Utils/HelperService';
import {CHAT_MESSAGE_TYPE} from '../Utils/chatHelper';

export function* recentChatListSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.recentChatApi, payload);
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

export function* deleteRecentChatListSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.deleteRecentChatApi, payload);
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

export function* visitorListSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.visitorListApi, payload);
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

export function* createChatRoomSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.createChatRoomApi, payload);
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
export function* getChatMessagesSaga({payload, page, callBack}) {
  try {
    const resp = yield call(ChatServices.getChatMessagesApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      const newData =
        resp?.data?.map(item => {
          if (item.type == CHAT_MESSAGE_TYPE.DOCUMENT) {
            return {
              ...item,
              _id: item._id,
              text: '',
              createdAt: item.createdAt,
              user: {
                _id: item.sender,
                name: item?.userName,
                avatar: item?.userProfile,
              },
              image: item.content,
              isReply:
                item?.replyMessageId && item?.isReply
                  ? {
                      ...item.isReply,
                      replyId: item.replyMessageId,
                    }
                  : null,
            };
          } else if (item.type == CHAT_MESSAGE_TYPE.CONTENT)
            return {
              ...item,
              _id: item._id,
              text: item.content,
              createdAt: item.createdAt,
              user: {
                _id: item.sender,
                name: item?.userName,
                avatar: item?.userProfile,
              },
              isReply:
                item?.replyMessageId && item?.isReply
                  ? {
                      ...item.isReply,
                      replyId: item.replyMessageId,
                    }
                  : null,
            };
          else if (item.type == CHAT_MESSAGE_TYPE.LIVE_LINK)
            return {
              ...item,
              _id: item._id,
              text: item.content,
              createdAt: item.createdAt,
              user: {
                _id: item.sender,
                name: item?.userName,
                avatar: item?.userProfile,
              },
              islink: true,
              channelToken: item?.liveRoomData?.channel_token,
              channelName: item?.liveRoomData?.channel_name,
              liveHostId: item?.liveRoomData?.hostId,
              isReply:
                item?.replyMessageId && item?.isReply
                  ? {
                      ...item.isReply,
                      replyId: item.replyMessageId,
                    }
                  : null,
            };
        }) || [];
      if (page == 0) {
        yield put(updateChatHistoryAction(newData));
      } else {
        yield put(getChatHistorySuccessAction(newData));
      }
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* getGroupMessagesSaga({payload, page, callBack}) {
  try {
    const resp = yield call(ChatServices.getGroupMessagesSagaApi, payload);
    if ((resp && resp.code == 200) || (resp && resp.code == 201)) {
      callBack(resp);
      const newData =
        resp?.data?.map(item => {
          if (item.type == CHAT_MESSAGE_TYPE.DOCUMENT) {
            return {
              ...item,
              _id: item._id,
              text: '',
              createdAt: item.createdAt,
              user: {
                _id: item.sender,
                name: item?.userName,
                avatar: item?.userProfile,
              },
              image: item.content,
              isReply:
                item?.replyMessageId && item?.isReply
                  ? {
                      ...item.isReply,
                      replyId: item.replyMessageId,
                    }
                  : null,
            };
          } else if (item.type == CHAT_MESSAGE_TYPE.LIVE_LINK) {
            return {
              ...item,
              _id: item._id,
              text: item.content,
              createdAt: item.createdAt,
              user: {
                _id: item.sender,
                name: item?.userName,
                avatar: item?.userProfile,
              },
              isReply:
                item?.replyMessageId && item?.isReply
                  ? {
                      ...item.isReply,
                      replyId: item.replyMessageId,
                    }
                  : null,
            };
          } else if (item.type == CHAT_MESSAGE_TYPE.CONTENT)
            return {
              ...item,
              _id: item._id,
              text: item.content,
              createdAt: item.createdAt,
              user: {
                _id: item.sender,
                name: item?.userName,
                avatar: item?.userProfile,
              },
              isReply:
                item?.replyMessageId && item?.isReply
                  ? {
                      ...item.isReply,
                      replyId: item.replyMessageId,
                    }
                  : null,
            };
        }) || [];
      if (page == 0) {
        yield put(updateGrpChatHistoryAction(newData));
      } else {
        yield put(getGroupChatHistorySuccessAction(newData));
      }
    } else {
      callBack(false);
      HelperService.showToast(resp?.message);
    }
  } catch (error) {
    callBack(false);
    HelperService.showToast('Something went wrong');
  }
}

export function* getChatListSaga({payload, page, callBack}) {
  try {
    const resp = yield call(ChatServices.getChatListApi, payload);
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

export function* uploadChatMediaFileSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.uploadChatMediaFileApi, payload);
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

export function* uploadChatVideoFileSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.uploadChatVideoFileSagaApi, payload);
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

export function* grpChatCreation({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.grpChatCreationApi, payload);
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

export function* grpChatUpdateSaga({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.grpChatUpdateApi, payload);
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

export function* getGroupChats({payload, callBack}) {
  try {
    const resp = yield call(ChatServices.getGroupChatsApi, payload);
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
