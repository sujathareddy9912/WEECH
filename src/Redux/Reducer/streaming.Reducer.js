import * as TYPES from '../Action/type';

const initialState = {
  joinedUserData: {},
  commentData: [],
  callCommentData: [],
  likeCount: 0,
  joinUserCount: 0,
  likeStatusStream: false,
  hostDetail: {},
  animationType: 'slideInRight',
  hostExtraDetail: {},
  agoraInitializedStatus: false,
  userLiveMute: false,
  kickedOutRooms: [],
  blockedLiveRooms: [],
};

const streamingReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type, payload} = action;

  switch (type) {
    case TYPES.JOIN_USER_DATA_ON_LIVE_STREAM: {
      return {
        ...prevState,
        joinedUserData: payload?.joinUserDetail,
      };
    }

    case TYPES.CLEAR_JOINED_USER_LIST_ACTION:
      return {
        ...prevState,
        joinedUserData: {},
      };

    case TYPES.JOIN_USER_LIVE_STREAM:
      return {
        ...prevState,
        joinUserCount: prevState.joinUserCount + 1,
      };

    case TYPES.REMOVE_USER_LIVE_STREAM:
      return {
        ...prevState,
        joinUserCount: prevState.joinUserCount - 1,
      };

    case TYPES.COMMENT_ON_LIVE_STREAM:
      return {
        ...prevState,
        commentData: [...prevState.commentData, payload?.commentData],
      };

    case TYPES.COMMENT_ON_CALL:
      return {
        ...prevState,
        callCommentData: [...prevState.callCommentData, payload?.commentData],
      };

    case TYPES.CLEAR_COMMENT_ON_CALL:
      return {
        ...prevState,
        callCommentData: [],
        commentData: [],
      };

    case TYPES.HOST_USER_DETAIL_ACTION:
      return {
        ...prevState,
        hostDetail: payload,
      };

    case TYPES.UPDATE_HOST_POINTS_ACTION: {
      const points = prevState.hostDetail.points + payload;
      return {
        ...prevState,
        hostDetail: {...prevState.hostDetail, points},
      };
    }

    case TYPES.LIKE_LIVE_STREAM:
      return {
        ...prevState,
        likeCount: prevState.likeCount + 1,
      };

    case TYPES.UPDATE_LIKED_STATUS_ON_STREAM:
      return {
        ...prevState,
        likeStatusStream: true,
      };

    case TYPES.CLEAR_LIVE_STREAM_DATA_ACTION:
      return {
        ...initialState,
      };

    case TYPES.SAVE_JOIN_USER_LIST_DATA:
      return {
        ...prevState,
        likeCount: payload?.totalLikes,
        joinUserCount: payload?.totalUsersJoined,
        likeStatusStream: payload?.likedByMe,
      };

    case TYPES.CHANGE_ANIMATION_TYPE:
      return {
        ...prevState,
        animationType: payload || 'slideInRight',
      };

    case TYPES.GET_HOST_EXTRA_DETAIL_SUCCESS_ACTION: {
      const prevPoints = prevState?.hostDetail?.points || 0;
      return {
        ...prevState,
        hostExtraDetail: payload,
        hostDetail: {
          ...prevState.hostDetail,
          points: prevPoints + payload?.gift || 0,
        },
      };
    }

    case TYPES.AGORA_INITIALISED_ACTION:
      return {
        ...prevState,
        agoraInitializedStatus: payload,
      };

    case TYPES.LIVE_USER_MUTE_FLAG:
      return {
        ...prevState,
        userLiveMute: payload,
      };

    case TYPES.PUT_IN_KICKOUT_ROOM: {
      return {
        ...prevState,
        kickedOutRooms: !prevState.kickedOutRooms.includes(payload)
          ? prevState.kickedOutRooms.push(payload)
          : prevState.kickedOutRooms,
      };
    }

    case TYPES.PUT_IN_BLOCK_ROOM: {
      return {
        ...prevState,
        blockedLiveRooms: !prevState.blockedLiveRooms.includes(payload)
          ? prevState.blockedLiveRooms.push(payload)
          : prevState.blockedLiveRooms,
      };
    }

    default:
      return {...prevState};
  }
};

export default streamingReducer;
