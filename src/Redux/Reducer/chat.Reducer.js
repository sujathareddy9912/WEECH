import * as TYPES from '../Action/type';
import {GiftedChat} from 'react-native-gifted-chat';

const initialState = {
  chatHistory: [],
  grpChatHistory: [],
  clearChatFlag: false,
  selectAll: false,
  deleteAll: false,
};

const chatReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type, payload} = action;

  switch (type) {
    case TYPES.GET_CHAT_HISTORY_SUCCESS_ACTION:
      return {
        ...prevState,
        chatHistory: [...prevState.chatHistory, ...payload],
      };
    case TYPES.UPDATE_CHAT_HISTORY_ACTION:
      return {
        ...prevState,
        chatHistory: payload,
      };

    case TYPES.APPEND_SOCKET_CHAT_DATA_ACTION: {
      return {
        ...prevState,
        chatHistory: GiftedChat.append(prevState.chatHistory, payload),
      };
    }
    case TYPES.UPDATE_CHAT_AFTER_DEL_ONE_MESSAGE: {
      return {
        ...prevState,
        chatHistory: prevState.chatHistory.filter(
          message => message._id !== payload,
        ),
      };
    }

    case TYPES.UPDATE_CLEAR_CHAT_FLAG: {
      return {
        ...prevState,
        clearChatFlag: payload,
      };
    }

    case TYPES.UPDATE_SELECT_ALL_CHAT: {
      return {
        ...prevState,
        selectAll: !prevState.selectAll,
      };
    }

    case TYPES.UPDATE_DELETE_CHAT: {
      return {
        ...prevState,
        deleteAll: payload,
      };
    }

    case TYPES.GET_GROUP_CHAT_HISTORY_SUCCESS_ACTION:
      return {
        ...prevState,
        grpChatHistory: [...prevState.grpChatHistory, ...payload],
      };

    case TYPES.UPDATE_GRP_CHAT_HISTORY_ACTION:
      return {
        ...prevState,
        grpChatHistory: payload,
      };

    case TYPES.APPEND_SOCKET_GRP_CHAT_DATA_ACTION: {
      return {
        ...prevState,
        grpChatHistory: GiftedChat.append(prevState.grpChatHistory, payload),
      };
    }

    default:
      return {...prevState};
  }
};

export default chatReducer;
