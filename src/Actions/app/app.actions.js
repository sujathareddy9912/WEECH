import {
  CALL_STATUS,
  LIVE_STREAM_STATUS,
} from '../../ActionConstant/app.constant';
export const getCallStatus = payload => ({
  type: CALL_STATUS,
  payload,
});

export const getLiveStreamStatus = payload => ({
  type: LIVE_STREAM_STATUS,
  payload,
});
