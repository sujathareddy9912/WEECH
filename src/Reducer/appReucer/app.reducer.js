import {
  CALL_STATUS,
  LIVE_STREAM_STATUS,
} from '../../ActionConstant/app.constant';

const initialState = {
  callStatus: false,
  liveStreamStatus: false,
};

export default function AppReducer(state = initialState, {type, payload}) {
  switch (type) {
    case CALL_STATUS:
      return setCallStatus(state, payload);
    case LIVE_STREAM_STATUS:
      return setLiveStreamStatus(state, payload);
    default:
      return state;
  }
}

const setCallStatus = (state, payload) => ({
  ...state,
  callStatus: payload,
});

const setLiveStreamStatus = (state, payload) => ({
  ...state,
  liveStreamStatus: payload,
});
