import * as TYPES from '../Action/type';

const initialState = {
  joinedUserData: {},
  joinUserCount: 0,
  hostDetail: {},
  peerId: [],
  incomingCallPopup: false,
  incomingCallData: {},
  isLiveActive: false,
  reconnectLiveStream: false,
};

const callReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type, payload} = action;

  switch (type) {
    case TYPES.JOIN_HOST_PEER_ID_ACTION:
      return {
        ...prevState,
        peerId: [payload],
      };

    case TYPES.JOIN_AUDIENCE_PEER_ID_ACTION: {
      return {
        ...prevState,
        peerId: [prevState.peerId?.[0], payload],
      };
    }

    case TYPES.UPDATE_CALL_PEER_ID_ACTION:
      return {
        ...prevState,
        peerId: payload,
      };

    case TYPES.INCOMING_CALL_POPUP_ACTION:
      return {
        ...prevState,
        incomingCallPopup: payload,
      };
    case TYPES.IS_LIVE_ACTIVE_ACTION:
      return {
        ...prevState,
        isLiveActive: payload,
      };

    case TYPES.INCOMING_CALL_POPUP_DATA_ACTION:
      return {
        ...prevState,
        incomingCallData: payload,
      };

    case TYPES.RECONNECT_LIVE_STREAM:
      return {
        ...prevState,
        reconnectLiveStream: payload,
      };

    default:
      return {...prevState};
  }
};

export default callReducer;
