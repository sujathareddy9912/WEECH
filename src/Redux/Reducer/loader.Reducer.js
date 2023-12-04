import * as TYPES from '../Action/type';

const initialState = {
  refreshData: false,
  showGiftComponentOnCall: false,
  followingListModalVisible: false,
  deleteRecentChatModalVisible: false,
};

const loaderReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type, payload} = action;

  switch (type) {
    case TYPES.REFRESH_DATA_ACTION:
      return {
        ...prevState,
        refreshData: payload,
      };
    case TYPES.SHOW_GIFTS_ON_CALL_ACTION:
      return {
        ...prevState,
        showGiftComponentOnCall: payload,
      };
    case TYPES.FOLLOWING_LIST_MODAL_ACTION:
      return {
        ...prevState,
        followingListModalVisible: payload,
      };
    case TYPES.DELETE_RECENT_CHAT_MODAL_ACTION:
      return {
        ...prevState,
        deleteRecentChatModalVisible: payload,
      };
    default:
      return {...prevState};
  }
};

export default loaderReducer;
